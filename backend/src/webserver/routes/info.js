const router = require('express').Router()
const os = require('os')
let db

module.exports = (_db) => {

  db = _db

  router.get('/', async function(req, res){

    let database

    try {
      let result = await db.raw('SELECT @@server_id AS serverId, @@version AS version, @@hostname AS hostname, @@port AS port, SUM(data_length + index_length) AS "bytes" FROM information_schema.TABLES GROUP BY table_catalog')

      while(result instanceof Array) result = result[0]

      database = result
    } catch(err){
      console.error(err)
    }

    res.json({
      backend: {
        version: process.version,
        hostname: os.hostname(),
      },
      database,
    })
  })

  return router
}
