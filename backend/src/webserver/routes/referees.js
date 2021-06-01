const router = require('express').Router()
const { generateToken, authenticateToken } = require('../../helpers/jwt')

module.exports = (db) => {

  // Index
  router.get('/', async (req, res) => {
    let referees = getAllReferees(req, res)
    res.json({referees})
  })

  // Create
  router.post('/', authenticateToken, async (req, res) => {
    createReferee(req, res)
    res.json({})
  })

  // Get (one referee)
  router.get('/:referee', async (req, res) => {
    let referee =getReferee(req, res)
    res.json({referee})
  })

  // Update
  router.post('/:referee', authenticateToken, async (req, res) => {
    updateReferee(req, res)
    res.json({})
  })

  // Delete
  router.delete('/:referee', authenticateToken, async (req, res) => {
    deleteReferee(req, res)
    res.json({})
  })

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