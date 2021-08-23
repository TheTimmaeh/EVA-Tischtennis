require('dotenv').config()

// Database
const db = require('./db')

// Webserver
const http = require('./webserver')(db)

// Websocket
const io = require('./websocket')(db, http)

// Start webserver
const server = http.listen(process.env.PORT || 3000, () => {
  let address = server.address().address
  if(address == '::') address = 'localhost'
  address = `http://${address}:${server.address().port}`

  console.log(`Server listening on ${address}`)
  if(process.env.DOCKER === 'true') console.info(`Please migrate using ${address}/knex/migrate`)
})
