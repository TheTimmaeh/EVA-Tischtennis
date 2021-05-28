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

  // Get (one competition)
  router.get('/:competition', async (req, res) => {
    res.json({})
  })

  // Update
  router.post('/:competition', authenticateToken, async (req, res) => {
    res.json({})
  })

  // Delete
  router.delete('/:competition', authenticateToken, async (req, res) => {
    res.json({})
  })

  return router
}
