const router = require('express').Router()
let db

module.exports = (_db) => {

  db = _db

  const { generateToken, authenticateToken, optionalAuthenticateToken } = require('../../helpers/jwt')(db)

  // Index
  router.get('/', optionalAuthenticateToken, getAllCompetitions)

  // Get (one competition)
  router.get('/:competition', getCompetition)

  // Create
  router.post('/', optionalAuthenticateToken,  createCompetition)

  // Update
  router.post('/:competition', authenticateToken, updateCompetition)

  // Delete
  router.delete('/:competition', authenticateToken, deleteCompetition)

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
  let data = (await db.first(req.user?.isAdmin ? select.admin : select.guest).from('competitions').where({ id: req.params.competition }))
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
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits ein Turnier ${req.body.name} ${req.body.startdate}.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

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
    let data = (await db.first(select.admin).from('competitions').where({ id: req.params.competition }))

    res.json({ success: true, message: 'Turnierdaten wurden aktualisiert.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (4)' })
  }
}

async function deleteCompetition(req, res){
  await db('competitions').where({ id: req.params.competition }).del()
  res.json({})
}
