const router = require('express').Router()

module.exports = (db) => {
  // Test Routes
  router.all('/*success', (req, res) => {
    res.json({ success: true, method: req.method, path: req.path, data: req.body })
  })

  router.all('/*error', (req, res) => {
    res.json({ success: false, message: 'An error has occured.', method: req.method, path: req.path, data: req.body })
  })

  router.use('/auth', require('./auth')(db))
  router.use('/users', require('./users')(db))
  router.use('/associations', require('./associations')(db))
  router.use('/persons', require('./persons')(db))
  router.use('/seasons', require('./seasons')(db))
  router.use('/competitions', require('./competitions')(db))
  router.use('/playerClasses', require('./playerClasses')(db))
  router.use('/test', require('./test')(db))
  router.use('/knex', require('./knex')(db))
  router.use('/info', require('./info')(db))

  return router
}
