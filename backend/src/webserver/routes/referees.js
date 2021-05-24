const router = require('express').Router()
const { generateToken, authenticateToken } = require('../../helpers/jwt')

module.exports = (db) => {

  // Index
  router.get('/', async (req, res) => {
    res.json({})
  })

  // Create
  router.post('/', authenticateToken, async (req, res) => {
    res.json({})
  })

  // Get (one referee)
  router.get('/:referee', async (req, res) => {
    res.json({})
  })

  // Get (list of referees)
  router.get('/:referees', async (req, res) => {
    res.json({})
  })

  // Update
  router.post('/:referee', authenticateToken, async (req, res) => {
    res.json({})
  })

  // Delete
  router.delete('/:referee', authenticateToken, async (req, res) => {
    res.json({})
  })

  return router
}
