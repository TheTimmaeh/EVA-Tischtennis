const router = require('express').Router()
const os = require('os')
let db

module.exports = (_db) => {

  db = _db

  // Index
  router.get('/', info)

  return router
}

async function info(req, res){
  res.json({
    dockerId: os.hostname(),
  })
}
