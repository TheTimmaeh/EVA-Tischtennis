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

  // Get (one associationTeam)
  router.get('/:associationTeam', async (req, res) => {
    res.json({})
  })

 // Get (all associationTeams)
   router.get('/:associationTeams', async (req, res) => {
    res.json({})
  })

  // Update
  router.post('/:associationTeam', authenticateToken, async (req, res) => {
    res.json({})
  })

  // Delete
  router.delete('/:associationTeam', authenticateToken, async (req, res) => {
    res.json({})
  })

  return router
}
