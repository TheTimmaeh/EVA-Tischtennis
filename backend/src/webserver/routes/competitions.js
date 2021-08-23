const router = require('express').Router()
let db

module.exports = (_db) => {

  db = _db

  const { generateToken, authenticateToken, optionalAuthenticateToken } = require('../../helpers/jwt')(db)

  // Index
  router.get('/', optionalAuthenticateToken, getAllCompetitions)

  // Get (one competition)
  router.get('/:competitionId', getCompetition)

  // Get CompetitionProfile
  router.get('/:competitionId/profile', getCompetitionProfile)

  // Create
  router.post('/', authenticateToken,  createCompetition)

  // Update
  router.post('/:competitionId', authenticateToken, updateCompetition)

  // Delete
  router.delete('/:competitionId', authenticateToken, deleteCompetition)

  // AssociationTeam Search
  router.get('/:competitionId/association_teams', authenticateToken, getAssociationTeams)

  // Encounters
  router.use('/:competitionId/encounters', require('./encounters')(db))

  return router
}

const select = {
  admin: ['*'],
  guest: ['*'],
}

async function getAllCompetitions(req, res){
  try {
    let data = await db.qb({ select: (req.user?.isAdmin ? select.admin : select.guest), from: 'competitions', ...req.query })

    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}

async function getCompetition(req, res){
  let data = await db.qb({ first: (req.user?.isAdmin ? select.admin : select.guest), from: 'competitions', where:{ id: req.params.competitionId }, ...req.query })
  res.json({ success: true, data })
}

async function getCompetitionProfile(req, res){
  let competition = await db.qb({ first: (req.user?.isAdmin ? select.admin : select.guest), from: 'competitions', where:{ id: req.params.competitionId }, ...req.query })
  let encounters = await db.qb({ select: (req.user?.isAdmin ? select.admin : select.guest), from: 'encounters', where: { competition: req.params.competitionId }, ...req.query })

  let playerIds = encounters.map((e) => [e.home, e.visitor]).flat()
  let players = await db.qb({ select: ['id', 'name', 'surname'], from: 'persons', whereIn: {id: playerIds}, ...req.query })
  encounters = encounters.map((e) => {
    e.home = players.find((p) => p.id === e.home)
    e.visitor = players.find((p) => p.id === e.visitor)
    return e
  })

  res.json({ success: true, data:{ competition, encounters} })
}

async function createCompetition(req, res){
  let result

  try {
    result = await db('competitions').insert({
      name: req.body.name,
      description: req.body.description,
      player_class: req.body.player_class,
      season: req.body.season,
    })
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits ein Turnier ${req.body.name} ${req.body.startdate}.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }
    console.error(err)

    return
  }

  if(!!result?.[0]){
    let data = await db('competitions').where({ id: result[0] }).first()

    res.json({ success: true, message: 'Turnier wurde angelegt.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (2)' })
  }
}

async function updateCompetition(req, res){
  let result

  try {
    result = await db('competitions').where({ id: req.params.person }).update({
      name: req.body.name,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      player_class: req.body.player_class,
    })
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits ein Turnier ${req.body.name} ${req.body.startdate}.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }

  if(result === 1){
    let data = (await db.first(select.admin).from('competitions').where({ id: req.params.competitionId }))

    res.json({ success: true, message: 'Turnierdaten wurden aktualisiert.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (4)' })
  }
}

async function deleteCompetition(req, res){

  try {
    result = await db('competitions').where({ id: req.params.competitionId }).del()
  } catch(err){
    if(err.code === 'ER_ROW_IS_REFERENCED_2'){
      res.json({ success: false, message: `Dieses Turnier ist in Benutzung und kann daher nicht gelöscht werden!` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }
    return
  }

  res.json({ success: true, message: 'Die Daten des Turniers wurden gelöscht.' })

}

async function getAssociationTeams(req, res){
  try {
    let competition = await db.qb({ first: ['season', 'player_class'], from: 'competitions', were: { id: req.params.competitionId }})

    let associations = await db.qb({ select: ['id', 'name'], from: 'associations', ...req.query })
    let associationIds = associations.map((a) => a.id)

    let data = await db.qb({ select: (req.user?.isAdmin ? select.admin : select.guest), from: 'association_teams', where: { season: competition.season, player_class: competition.player_class }, whereIn: { association: associationIds }})

    data = data.map((d) => Object.assign(d, { association_name: associations.find((a) => a.id == d.association).name}))

    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}
