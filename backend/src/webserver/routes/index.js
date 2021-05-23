const router = require('express').Router()

module.exports = (db) => {
  const authRoutes = require('./auth')(db)
  router.use('/auth', authRoutes)

  // Test Routes
  router.all('/*success', (req, res) => {
    res.json({ success: true, method: req.method, path: req.path, data: req.body })
  })

  router.all('/*error', (req, res) => {
    res.json({ success: false, message: 'An error has occured.', method: req.method, path: req.path, data: req.body })
  })

  return router
}
