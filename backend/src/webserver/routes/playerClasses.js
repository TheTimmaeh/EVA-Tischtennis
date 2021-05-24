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

  // Get (one playerClass)
  router.get('/:playerClass', async (req, res) => {
    res.json({})
  })

  // Get (all playerClasses)
  router.get('/:playerClasses', async (req, res) => {
    res.json({})
  })

  // Update
  router.post('/:playerClass', authenticateToken, async (req, res) => {
    res.json({})
  })

  // Delete
  router.delete('/:playerClass', authenticateToken, async (req, res) => {
    res.json({})
  })

  return router
}
