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
  router.get('/:playerClassId',optionalAuthenticateToken,  getPlayerClass)

  // Update
  router.post('/:playerClassId', authenticateToken, updatePlayerClass)

  // Delete
  router.delete('/:playerClassId', authenticateToken, deletePlayerClass)

  return router
}

const select = {
  admin: ['*'],
  guest: ['*'],
}

async function getPlayerClasses(req, res){
  try {
    let data = await db.qb({ select: (req.user?.isAdmin ? select.admin : select.guest), from: 'player_classes', ...req.query })

    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}

async function getPlayerClass(req, res){
  let data = (await db.first(req.user?.isAdmin ? select.admin : select.guest).from('player_classes').where({ id: req.params.playerClassId }))
  res.json({ success: true, data })
}

async function createPlayerClass(req, res){
  let result

  try {
    result = await db('player_classes').insert({
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
    let data = await db('player_classes').where({ id: result[0] }).first()
    res.json({ success: true, message: 'Spielerklasse wurde angelegt.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (2)' })
  }
}



async function updatePlayerClass(req, res){
  let result

  try {
    result = await db('player_classes').where({ id: req.params.playerClassId }).update({//hier war person, ich hab id draus gemacht
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
    let data = (await db.first(select.admin).from('player_classes').where({ id: req.params.playerClassId }))

    res.json({ success: true, message: 'Spielerklasse wurde aktualisiert.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (4)' })
  }
}

async function deletePlayerClass(req, res){
  let result

  try {
    result = await db('player_classes').where({ id: req.params.playerClassId }).del()
  } catch(err){
    if(err.code === 'ER_ROW_IS_REFERENCED_2'){
      res.json({ success: false, message: `Diese Spielerklasse ist in Benutzung und kann daher nicht gelöscht werden!` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }

  res.json({ success: true, message: 'Die Daten der Spielerklasse wurden gelöscht.' })
}
