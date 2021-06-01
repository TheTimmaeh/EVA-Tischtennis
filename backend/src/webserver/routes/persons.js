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

  // Get (one person)
  router.get('/:person', async (req, res) => {
    res.json({})
  })

  // Update
  router.post('/:person', authenticateToken, async (req, res) => {
    res.json({})
  })

  // Delete
  router.delete('/:person', authenticateToken, async (req, res) => {
    res.json({})
  })

  return router
}
