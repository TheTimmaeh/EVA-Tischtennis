const router = require('express').Router()
const bcrypt = require('bcrypt')
const { generateToken, authenticateToken } = require('../../helpers/jwt')
let db

module.exports = (_db) => {

  db = _db

  // Index
  router.get('/', getAllUsers)

  // Create
  router.post('/', authenticateToken, createUser)

  // Get (one user)
  router.get('/:user', getUser)

  // Update
  router.post('/:user', authenticateToken, updateUser)

  // Delete
  router.delete('/:user', authenticateToken, deleteUser)

  return router
}


async function getAllUsers(req, res){
  try {
    let data = await db.qb({ select: ['id', 'username', 'isAdmin'], from: 'users', ...req.query })

    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}

async function getUser(req, res){
  let data = (await db.first(['id', 'username', 'isAdmin']).from('users').where({ id: req.params.user }))
  res.json({ success: true, data })
}

async function createUser(req, res){
  let result

  let password = await bcrypt.hash(req.body.password, 10)

  try {
    result = await db('users').insert({
      username: req.body.username,
      password,
      isAdmin: req.body.isAdmin === true || req.body.isAdmin === 'true',
    })
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits ein User ${req.body.username}.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }

  if(!!result?.[0]){
    let data = (await db.first(['id', 'username', 'isAdmin']).from('users').where({ id: result[0] }))

    res.json({ success: true, message: 'User wurde angelegt.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (2)' })
  }
}

async function updateUser(req, res){
  let result

  let password = await bcrypt.hash(req.body.password, 10)

  try {
    result = await db('users').where({ id: req.params.user }).update({
      username: req.body.username,
      password,
      isAdmin: req.body.isAdmin === true || req.body.isAdmin === 'true',
    })
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits ein User ${req.body.username}.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }

  if(result === 1){
    let data = (await db.first(['id', 'username', 'isAdmin']).from('users').where({ id: req.params.user }))

    res.json({ success: true, message: 'Userdaten wurden aktualisiert.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (4)' })
  }
}

async function deleteUser(req, res){
  let result

  try {
    result = await db('users').where({ id: req.params.user }).del()
  } catch(err){
    res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
    console.error({ ...err })

    return
  }

  if(result === 1){
    res.json({ success: true, message: 'User wurde gelöscht.' })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (6)' })
  }
}
