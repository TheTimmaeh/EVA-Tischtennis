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

  // Get (one association)
  router.get('/:association', async (req, res) => {
    res.json({})
  })

  // Update
  router.post('/:association', authenticateToken, async (req, res) => {
    res.json({})
  })

  // Delete
  router.delete('/:association', authenticateToken, async (req, res) => {
    res.json({})
  })

  return router
}
