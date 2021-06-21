const router = require('express').Router()
const bcrypt = require('bcrypt')

module.exports = (db) => {
  const { generateToken, authenticateToken } = require('../../helpers/jwt')(db)

  router.get('/', authenticateToken, (req, res) => {
    res.json({ user: req.user, body: req.body })
  })

  router.post('/logout', authenticateToken, async (req, res) => {
    let result = await db('sessions').where({ id: req.user.id, token: req.token }).delete()

    console.log(result)

    res.json({ success: !!result })
  })

  router.post('/validate', authenticateToken, (req, res) => {
    if(req.user) res.json({ success: true, user: req.user })
    else res.json({ success: false, message: 'Could not validate token.' })
  })

  router.post('/', async (req, res) => {
    let { username, password } = req.body

    let user = await db('users').where({ username }).first()

    let result = await bcrypt.compare(password, user.password)

    if(!result) res.json({ success: false, message: 'User not found.' })
    else {
      let token = generateToken({ id: user.id, username: user.username, isAdmin: user.isAdmin })

      await db('sessions').insert({ user: user.id, token })

      res.json({ success: true, user: { username: user.username, isAdmin: user.isAdmin, token }})
    }
  })

  return router
}
