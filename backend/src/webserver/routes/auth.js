const router = require('express').Router()
const bcrypt = require('bcrypt')

module.exports = (db) => {
  const { generateToken, authenticateToken, optionalAuthenticateToken } = require('../../helpers/jwt')(db)

  router.get('/', authenticateToken, (req, res) => {
    res.json({ user: req.user, body: req.body })
  })

  router.post('/logout', optionalAuthenticateToken, async (req, res) => {
    let result = await db('sessions').where({ id: req.user.id, token: req.token }).delete()
    res.json({ success: !!result })
  })

  router.post('/validate', optionalAuthenticateToken, (req, res) => {
    if(req.user) res.json({ success: true, user: req.user })
    else res.json({ success: false, message: 'Could not validate token.' })
  })

  router.post('/', async (req, res) => {
    let { username, password } = req.body

    let user = await db('users').where({ username }).first()

    if(!user || !(await bcrypt.compare(password, user?.password))) res.json({ success: false, message: 'User not found.' })
    else {
      let token = generateToken({ id: user.id, username: user.username, isAdmin: user.isAdmin })

      await db('sessions').insert({ user: user.id, token })

      res.json({ success: true, user: { id: user.id, username: user.username, isAdmin: user.isAdmin, token }})
    }
  })

  return router
}
