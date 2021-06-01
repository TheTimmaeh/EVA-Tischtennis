const router = require('express').Router()
const { generateToken, authenticateToken } = require('../../helpers/jwt')
let db

module.exports = (_db) => {
  db = _db

  // Index
  router.get('/', getAllCompetitions)

  // Get (one competition)
  router.get('/:competition', getCompetition)

  // Create
  router.post('/', authenticateToken, createCompetition)

  // Update
  router.post('/:competition', authenticateToken, updateCompetition)

  // Delete
  router.delete('/:competition', authenticateToken, deleteCompetition)

  return router
}

async function getAllCompetitions(req, res){
  // let competitions = (await db.select().from('competitions'))
  //
  // res.json({competitions})

  res.json({})
}

async function getCompetition(req, res){
  res.json({})
}

async function createCompetition(req, res){
  res.json({})
}

async function updateCompetition(req, res){
  res.json({})
}

async function deleteCompetition(req, res){
  res.json({})
}
