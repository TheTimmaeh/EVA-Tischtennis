const router = require('express').Router()
let db

module.exports = (_db) => {

  db = _db

  const { generateToken, authenticateToken } = require('../../helpers/jwt')(db)

  // Index
  router.get('/', getAllReferees)

  // Create
  router.post('/', authenticateToken, createReferee)

  // Get (one referee)
  router.get('/:referee', getReferee)

  // Update
  router.post('/:referee', authenticateToken, updateReferee)

  // Delete
  router.delete('/:referee', authenticateToken, deleteReferee)

  return router
}

async function getAllReferees(req, res){
  let referees = (await db.select('username').from('users').where({ isAdmin: false }))
  res.json({referees})
}

async function getReferee(req, res){
  let referee = (await db.select('username').from('users').where({ username: req.params.referee }))
  res.json({referee})
}

async function createReferee(req, res){
  db('users').insert({
    username: req.username,
    password: req.password,
    isAdmin: false,
  })

  res.json({})
}

async function updateReferee(req, res){
  db('users').where({ username: req.params.referee }).update({
    password: req.password
  })

  res.json({})
}

async function deleteReferee(req, res){
  await db('users').where({ username: req.params.referee }).del()
  res.json({})
}
