const jwt = require('jsonwebtoken')

const generateToken = (payload) => jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1800s' })

const authenticateToken = (req, res, next) => {
  let header = req.headers['authorization'] || ''
  let token = header.split(' ')[1]

  if(token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
    if(err){
      console.error('authenticateToken', err)
      return res.status(403).json({ success: false, error: err.name })
    }

    req.user = payload

    next()
  })
}

const authenticateSocket = (socket, next) => {
  let header = socket.request.headers['authorization'] || ''
  let token = header.split(' ')[1]

  if(token == null) return next(new Error('Authentication Error: No Token.'))

  jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
    if(err){
      console.error('authenticateSocket', err)
      return next(new Error('Authentication Error: Could not verify token.'))
    }

    next()
  })
}

module.exports = { generateToken, authenticateToken, authenticateSocket }
