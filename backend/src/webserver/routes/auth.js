const router = require('express').Router()
const { generateToken, authenticateToken } = require('../../helpers/jwt')
const users = require('../../helpers/users')

router.get('/', authenticateToken, (req, res) => {
  res.json({ user: req.user, body: req.body })
})

router.post('/validate', authenticateToken, (req, res) => {
  if(req.user) res.json({ success: true, user: req.user })
  else res.json({ success: false, message: 'Could not validate token.' })
})

module.exports = (db) => {
  router.post('/', async (req, res) => {
    let { username, password } = req.body
    let user = (await db('users').where({ username, password }))?.[0]

    if(!user) res.json({ success: false, message: 'User not found.' })
    else {
      let token = generateToken({ id: user.id, username: user.username, isAdmin: user.isAdmin })
      res.json({ success: true, user: { username: user.username, isAdmin: user.isAdmin, token }})
    }
  })

  return router
}
