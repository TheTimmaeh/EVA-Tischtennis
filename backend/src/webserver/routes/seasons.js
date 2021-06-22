const router = require('express').Router()
let db

module.exports = (_db) => {

  db = _db

  const { generateToken, authenticateToken, optionalAuthenticateToken } = require('../../helpers/jwt')(db)

  // Index
  router.get('/', optionalAuthenticateToken, getAllSeasons)

  // Create
  router.post('/', authenticateToken, createSeason)

  // Get (one saison)
  router.get('/:saison', optionalAuthenticateToken, getSeason)

  // Update
  router.post('/:saison', authenticateToken, updateSeason)

  // Delete
  router.delete('/:season', authenticateToken, deleteSeason)

  return router
}

const select = {
  admin: ['*'],
  guest: ['*'],
}


async function getAllSeasons(req, res){
  try {
    let data = await db.qb({ select: (req.user?.isAdmin ? select.admin : select.guest), from: 'seasons', ...req.query })

    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}

async function getSeason(req, res){
  let data = (await db.first(req.user?.isAdmin ? select.admin : select.guest).from('seasons').where({ id: req.params.season }))
  res.json({ success: true, data })
}

async function createSeason(req, res){
  let result

  try {
    result = await db('seasons').insert({
      year: req.body.year,
      seasons: req.body.season,
      title: req.body.title,
      description: req.body.description,
    })
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits eine Saison ${req.body.year} ${req.body.season}.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }

  if(!!result?.[0]){
    let data = await db('seasons').where({ id: result[0] }).first()

    res.json({ success: true, message: 'Saison wurde angelegt.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (2)' })
  }
}

async function updateSeason(req, res){
  let result

  try {
    result = await db('seasons').where({ id: req.params.season }).update({
      year: req.body.year,
      seasons: req.body.season,
      title: req.body.title,
      description: req.body.description,
    })
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits eine Saison ${req.body.year} ${req.body.season}.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }

  if(result === 1){
    let data = (await db.first(select.admin).from('seasons').where({ id: req.params.season }))

    res.json({ success: true, message: 'Die Daten der Saison wurden aktualisiert.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (4)' })
  }
}

async function deleteSeason(req, res){
  await db('seasons').where({ year: req.year, season: req.params.season }).del()
  res.json({})
}
