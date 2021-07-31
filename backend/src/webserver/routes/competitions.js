const router = require('express').Router()
let db

module.exports = (_db) => {

  db = _db

  const { generateToken, authenticateToken, optionalAuthenticateToken } = require('../../helpers/jwt')(db)

  // Index
  router.get('/', optionalAuthenticateToken, getAllCompetitions)

  // Get (one competition)
  router.get('/:competitionId', getCompetition)

  // Create
  router.post('/', optionalAuthenticateToken,  createCompetition)

  // Update
  router.post('/:competitionId', authenticateToken, updateCompetition)

  // Delete
  router.delete('/:competitionId', authenticateToken, deleteCompetition)

  // AssociationTeam Search
  router.get('/:competitionId/association_teams', authenticateToken, getAssociationTeams)

  // Encounters Create
  router.post('/:competitionId/encounters/create', authenticateToken, createEncounters)

  // Get All Encounters 
  router.get('/:competitionId/encounters', authenticateToken, getAllEncounters)

  // Get  Encounter
  router.get('/:competitionId/encounters/:encountersId', authenticateToken, getEncounter)

  // Encounters Update
  router.post('/:competitionId/encounters/:encountersId/update', authenticateToken, updateEncounters)

   // Encounter Delete
   router.delete('/:competitionId/encounters/:encountersId', authenticateToken, deleteEncounter)

  // Match Create
  router.post('/:competitionId/encounters/:encountersId/match/create', authenticateToken, createMatch)

  // Get All Matches
  router.get('/:competitionId/encounters/:encountersId/match/index', authenticateToken, getAllMatches)

  // Delete Match
  router.delete('/:competitionId/encounters/:encountersId/match/:matchId', authenticateToken, deleteMatch)

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
  let data = (await db.first(req.user?.isAdmin ? select.admin : select.guest).from('competitions').where({ id: req.params.competitionId }))
  res.json({ success: true, data })
}

async function createCompetition(req, res){
  let result

  try {
    result = await db('competitions').insert({
      name: req.body.name,
      description: req.body.description,
      player_class: req.body.playerclass,
      season: req.body.season,
    })
    console.log(result)
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
      playerclass: req.body.playerclass,
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

    let data = await db.qb({ select: (req.user?.isAdmin ? select.admin : select.guest), from: 'association_teams', where: { season: competition.season, playerClass: competition.player_class }, whereIn: { association: associationIds }})

    data = data.map((d) => Object.assign(d, { association_name: associations.find((a) => a.id == d.association).name}))

    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}


async function createEncounters(req, res){
  let result

  try {
    result = await db('encounters').insert({
      competition: req.params.competitionId,
      game_stage: req.body.gamestage,
      home: req.body.home,
      visitor: req.body.visitor,
      datetime: req.body.date,
    })
    console.log(result)
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits eine Begegnung zwischen ${req.body.home} ${req.body.visitor}.` })
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

async function getAllEncounters(req, res){
  try {
    let data = await db.qb({ select: (req.user?.isAdmin ? select.admin : select.guest), from: 'encounters', ...req.query })

    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}

async function getEncounter(req, res){
  let data = (await db.first(req.user?.isAdmin ? select.admin : select.guest).from('encounters').where({ id: req.params.encountersId }))
  res.json({ success: true, data })
}

async function updateEncounters(req, res){
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
  console.log(req.params.encountersId)
  
  try {
    result = await db('encounters').where({ id: req.params.encountersId }).del()
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


async function createMatch(req, res){
  let result

  try {
    result = await db('matches').insert({
      home_player: req.body.home_player,
      visitor_player: req.body.visitor_player,
      referee: req.body.referee,
      encounter: req.params.encontersId,
      sets: 5,
    })
    console.log(result)
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits eine solches Spiel zwischen ${req.body.home_player} ${req.body.visitor_player}.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }
    console.error(err)

    return
  }

  if(!!result?.[0]){
    let data = await db('matches').where({ id: result[0] }).first()

    res.json({ success: true, message: 'Spiel wurde angelegt.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (2)' })
  }
}


async function getAllMatches(req, res){
  try {
    let data = await db.qb({ select: (req.user?.isAdmin ? select.admin : select.guest), from: 'matches', ...req.query })

    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}

async function deleteMatch(req, res){
  
  try {
    result = await db('matches').where({ id: req.params.matchId }).del()
  } catch(err){
    if(err.code === 'ER_ROW_IS_REFERENCED_2'){
      res.json({ success: false, message: `Dieses Spiel ist in Benutzung und kann daher nicht gelöscht werden!` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }
    return
  }

  res.json({ success: true, message: 'Die Daten des Spiels wurden gelöscht.' })

}