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

  // Get (one saison)
  router.get('/:season', async (req, res) => {
    res.json({})
  })

  // Update
  router.post('/:season', authenticateToken, async (req, res) => {
    res.json({})
  })

  // Delete
  router.delete('/:season', authenticateToken, async (req, res) => {
    res.json({})
  })

  return router
}
