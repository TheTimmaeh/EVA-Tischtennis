const router = require('express').Router({ mergeParams: true })
let db

module.exports = (_db) => {

  db = _db

  const { generateToken, authenticateToken, optionalAuthenticateToken } = require('../../helpers/jwt')(db)

  // Index
  router.get('/', optionalAuthenticateToken, getAllEncounters)

  // Get (one encounter)
  router.get('/:encounterId', optionalAuthenticateToken, getEncounter)

  // Create
  router.post('/create', authenticateToken, createEncounter)

  // Update
  router.post('/:encounterId/update', authenticateToken, updateEncounter)

  // Delete
  router.delete('/:encounterId', authenticateToken, deleteEncounter)

  // Matches
  router.use('/:encounterId/matches', require('./matches')(db))

  return router
}

const select = {
  admin: ['*'],
  guest: ['*'],
}

async function createEncounter(req, res){
  let result

  try {
    result = await db('encounters').insert({
      competition: req.params.competitionId,
      game_stage: req.body.gamestage,
      home: req.body.home,
      visitor: req.body.visitor,
      datetime: req.body.date,
    })
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits eine Begegnung zwischen ${req.body.home} ${req.body.visitor}.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }

  if(!!result?.[0]){
    let encounter = await db('encounters').where({ id: result[0] }).first()
    let home
    let visitor

    try {
      home = await db('team_members').where({ team: encounter.home })
      visitor = await db('team_members').where({ team: encounter.visitor })
    } catch(err){
      console.error(err)
    }

    try {
      result = await db('matches').insert([
        {
          encounter: encounter.id,
          home_player_1: home.find((p) => p.position == 'E1').member,
          visitor_player_1: visitor.find((p) => p.position == 'E2').member,
          sets: 5
        },
        {
          encounter: encounter.id,
          home_player_1: home.find((p) => p.position == 'E2').member,
          visitor_player_1: visitor.find((p) => p.position == 'E1').member,
          sets: 5
        },
        {
          encounter: encounter.id,
          home_player_1: home.find((p) => p.position == 'E3').member,
          visitor_player_1: visitor.find((p) => p.position == 'E3').member,
          sets: 5
        },
        {
          encounter: encounter.id,
          home_player_1: home.find((p) => p.position == 'D1').member,
          home_player_2: home.find((p) => p.position == 'D2').member,
          visitor_player_1: visitor.find((p) => p.position == 'D1').member,
          visitor_player_2: visitor.find((p) => p.position == 'D2').member,
          sets: 5
        },
      ])
    } catch(err){
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error(2, { ...err })
      return
    }

    let matches

    if(result.length > 0){
      matches = await db('matches').whereIn('id', result)
    }

    res.json({ success: true, message: 'Turnier wurde angelegt.', data: { encounter, matches } })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (2)' })
  }
}

async function getAllEncounters(req, res){
  try {
    let encounters = await db.qb({ select: (req.user?.isAdmin ? select.admin : select.guest), from: 'encounters', where: { competition: req.params.competitionId }, ...req.query })
    let associationTeamIds = encounters.map((e) => [e.visitor, e.home ]).flat()
    let associationTeams = await db.qb({ select: ['id', 'name', 'association'], from: 'association_teams', whereIn: {id: associationTeamIds}, ...req.query })
    let associationIds = associationTeams.map((e) => e.association)
    let associations = await db.qb({ select: ['id', 'name'], from: 'associations', whereIn: {id: associationIds}, ...req.query })
    associationTeams =associationTeams.map((a)=> {
      a.association = associations.find((e) => e.id === a.association)
      return a
    })
    encounters = encounters.map((e) => {
      e.home = associationTeams.find((p) => p.id === e.home)
      e.visitor = associationTeams.find((p) => p.id === e.visitor)
      return e
    })


    res.json({ success: true, data : encounters})
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}

async function getEncounter(req, res){
  let data = (await db.first(req.user?.isAdmin ? select.admin : select.guest).from('encounters').where({ id: req.params.encounterId }))
  res.json({ success: true, data })
}

async function updateEncounter(req, res){
  let result

  try {
    result = await db('encounters').where({ id: req.params.encontersId }).update({
      competition: req.params.competitionId,
      game_stage: req.body.gamestage,
      home: req.body.home,
      visitor: req.body.visitor,
      datetime: req.body.date,
    })
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits eine solche Begegnung.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }

  if(result === 1){
    let data = (await db.first(select.admin).from('encounters').where({ id: req.params.encontersId }))

    res.json({ success: true, message: 'Begegnungsdaten wurden aktualisiert.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (4)' })
  }
}

async function deleteEncounter(req, res){
  try {
    result = await db('encounters').where({ id: req.params.encounterId }).del()
  } catch(err){
    if(err.code === 'ER_ROW_IS_REFERENCED_2'){
      res.json({ success: false, message: `Diese Begegnung ist in Benutzung und kann daher nicht gelöscht werden!` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }
    return
  }

  res.json({ success: true, message: 'Die Daten der Begegnung wurden gelöscht.' })

}
