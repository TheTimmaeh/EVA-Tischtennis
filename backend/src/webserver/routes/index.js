const router = require('express').Router()

module.exports = (db) => {
  router.use('/auth', require('./auth')(db))
  router.use('/associations', require('./associations')(db))
  router.use('/associationTeams', require('./associationTeams')(db))
  router.use('/competitions', require('./competitions')(db))
  router.use('/members', require('./members')(db))
  router.use('/playerClasses', require('./playerClasses')(db))
  router.use('/referees', require('./referees')(db))
  router.use('/seasons', require('./seasons')(db))

  // Test Routes
  router.all('/*success', (req, res) => {
    res.json({ success: true, method: req.method, path: req.path, data: req.body })
  })

  router.all('/*error', (req, res) => {
    res.json({ success: false, message: 'An error has occured.', method: req.method, path: req.path, data: req.body })
  })

  return router
}
