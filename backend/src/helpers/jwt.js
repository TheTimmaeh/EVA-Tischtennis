const jwt = require('jsonwebtoken')

module.exports = (db) => {

  const generateToken = (payload) => jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '12h' })

  const authenticateToken = (req, res, next) => {
    let header = req.headers['authorization'] || ''
    let token = header.split(' ')[1]

    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
      if(err){
        console.error('authenticateToken', err)
        return res.status(403).json({ success: false, error: err.name })
      }

      let session = await db.first().from('sessions').where({ user: payload.id, token })

      if(session){
        req.token = token
        req.user = payload
      }

      next()
    })
  }

  const optionalAuthenticateToken = (req, res, next) => {
    let header = req.headers['authorization'] || ''
    let token = header.split(' ')[1]

    if(token == null){
      next()
      return
      // return res.sendStatus(401)
    }

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
      if(!err){
        let session = await db.first().from('sessions').where({ user: payload.id, token })

        if(session){
          req.token = token
          req.user = payload
        }
      }

      next()
    })
  }

  const authenticateSocket = (socket, next) => {
    let header = socket.request.headers['authorization'] || ''
    let token = header.split(' ')[1]

    if(token == null) return next(new Error('Authentication Error: No Token.'))

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
      if(err){
        console.error('authenticateSocket', err)
        return next(new Error('Authentication Error: Could not verify token.'))
      }

      let session = await db.first().from('sessions').where({ user: payload.id, token })

      if(session){
        socket.token = token
        socket.user = payload
      }

      next()
    })
  }

  const optionalAuthenticateSocket = (socket, next) => {
    let header = socket.request.headers['authorization'] || ''
    let token = header.split(' ')[1]

    if(token == null) return next()

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
      if(err){
        console.error('authenticateSocket', err)
        return next(new Error('Authentication Error: Could not verify token.'))
      }

      let session = await db.first().from('sessions').where({ user: payload.id, token })

      if(session){
        socket.token = token
        socket.user = payload
      }

      next()
    })
  }

  return { generateToken, authenticateToken, optionalAuthenticateToken, authenticateSocket, optionalAuthenticateSocket }
}
