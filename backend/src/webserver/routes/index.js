const router = require('express').Router()

module.exports = (db) => {
  const authRoutes = require('./auth')(db)
  router.use('/auth', authRoutes)

  return router
}
