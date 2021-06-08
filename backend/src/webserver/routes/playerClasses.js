const router = require('express').Router()
const { generateToken, authenticateToken } = require('../../helpers/jwt')
let db

module.exports = (_db) => {

  db = _db

  // Index
  router.get('/', getPlayerClasses)

  // Create
  router.post('/', authenticateToken, createPlayerClass)

  // Get (one playerClass)
  router.get('/:playerClass', getPlayerClass)

  // Update
  router.post('/:playerClass', authenticateToken, updatePlayerClass)

  // Delete
  router.delete('/:playerClass', authenticateToken, deletePlayerClass)

  return router
}

async function getPlayerClasses(req, res){
  let playerClasses = (await db.select().from('playerClasses'))
  res.json({playerClasses})
}

async function getPlayerClass(req, res){
  let playerClass = (await db.select().from('playerClasses').where({ id: req.params.playerClass }))
  res.json({playerClass})
}

async function createPlayerClass(req, res){
  db('playerClasses').insert({
    name: req.name,
    age: req.age,
    gender: req.gender,
  })

  res.json({})
}

async function updatePlayerClass(req, res){
  db('playerClasses').where({ id: req.params.playerClass }).update({
    name: req.name,
    age: req.age,
    gender: req.gender,
  })

  res.json({})
}

async function deletePlayerClass(req, res){
  await db('playerClasses').where({ id: req.params.playerClass }).del()
  res.json({})
}
