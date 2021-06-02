const router = require('express').Router()
const { generateToken, authenticateToken } = require('../../helpers/jwt')

module.exports = (db) => {

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
  let referees = (await db.select().from('users').where('isAdmin', false)) 
  res.json({referees})
}

async function getReferee(req, res){
  let referee = (await db.select().from('users').where('username', req)) 
  res.json({referee})
}

async function createReferee(req, res){
  db('users').insert([{username: req.surname}, {password: req.password},{isAdmin:false},])
  res.json({})
}

async function updateReferee(req, res){
  db('users').where('username', req.surname).update([{password: req.password}])
  res.json({})
}

async function deleteReferee(req, res){
  await db('users').where('username', req).del()
  res.json({})
}