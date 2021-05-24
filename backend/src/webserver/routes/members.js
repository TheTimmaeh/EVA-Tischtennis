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

  // Get (one member)
  router.get('/:member', async (req, res) => {
    res.json({})
  })

  // Get (list of members)
  router.get('/:members', async (req, res) => {
    res.json({})
  })

  // Update
  router.post('/:member', authenticateToken, async (req, res) => {
    res.json({})
  })

  // Delete
  router.delete('/:member', authenticateToken, async (req, res) => {
    res.json({})
  })

  return router
}
