const router = require('express').Router()
let db

module.exports = (_db) => {

  db = _db

  const { generateToken, authenticateToken, optionalAuthenticateToken } = require('../../helpers/jwt')(db)

  // Index
  router.get('/', optionalAuthenticateToken, getPlayerClasses)

  // Create
  router.post('/', authenticateToken, createPlayerClass)

  // Get (one playerClass)
  router.get('/:playerClass',optionalAuthenticateToken,  getPlayerClass)

  // Update
  router.post('/:playerClass', authenticateToken, updatePlayerClass)

  // Delete
  router.delete('/:playerClass', authenticateToken, deletePlayerClass)

  return router
}

const select = {
  admin: ['*'],
  guest: ['*'],
}

async function getPlayerClasses(req, res){
  try {
    let data = await db.qb({ select: (req.user?.isAdmin ? select.admin : select.guest), from: 'classes', ...req.query })

    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}

async function getPlayerClass(req, res){
  let data = (await db.first(req.user?.isAdmin ? select.admin : select.guest).from('classes').where({ id: req.params.playerClass }))
  res.json({ success: true, data })
}

async function createPlayerClass(req, res){
  let result

  try {
    result = await db('classes').insert({
      name: req.body.name,
      age_from: req.body.age_from,
      age_to: req.body.age_to,
      gender: req.body.gender,
    })
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits eine Spielerklasse ${req.body.name}.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }

  if(!!result?.[0]){
    let data = await db('classes').where({ id: result[0] }).first()
    res.json({ success: true, message: 'Spielerklasse wurde angelegt.', data }) 
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (2)' })
  }
}

async function updatePlayerClass(req, res){
  db('classes').where({ id: req.params.playerClass }).update({
    name: req.name,
    age_from: req.body.age_from,
    age_to: req.body.age_to,
    gender: req.gender,
  })

  res.json({})
}

async function updatePlayerClass(req, res){
  let result

  try {
    result = await db('classes').where({ id: req.params.person }).update({
      name: req.body.name,
      age_from: req.body.age_from,
      age_to: req.body.age_to,
      gender: req.body.gender,
    })
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits eine Spielerklasse ${req.body.name}.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }

  if(result === 1){
    let data = (await db.first(select.admin).from('classes').where({ id: req.params.playerClass }))

    res.json({ success: true, message: 'Spielerklasse wurde aktualisiert.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (4)' })
  }
}

async function deletePlayerClass(req, res){
  await db('classes').where({ id: req.params.playerClass }).del()
  res.json({})
}
