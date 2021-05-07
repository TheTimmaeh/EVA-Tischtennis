const router = require('express').Router()
const { generateToken, authenticateToken } = require('../helpers/jwt')
const users = require('../helpers/users')

router.get('/', authenticateToken, (req, res) => {
  res.json({ user: req.user, body: req.body })
})

router.post('/', (req, res) => {
  let { username, password } = req.body

  let user = users.find((u) => u.username === username && u.password === password)

  if(!user) res.json({ success: false, message: 'User not found.' })
  else {
    let token = generateToken({ username: user.username, isAdmin: user.isAdmin })
    res.json({ success: true, user: { username: user.username, isAdmin: user.isAdmin, token }})
  }
})

router.post('/validate', authenticateToken, (req, res) => {
  if(req.user) res.json({ success: true, user: req.user })
  else res.json({ success: false, message: 'Could not validate token.' })
})

module.exports = router
