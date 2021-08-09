const router = require('express').Router()
let db

module.exports = (_db) => {

  db = _db

  router.get('/migrate', async function(req, res){
    let result

    try {
      let result = await db.migrate.latest()
    } catch(err){
      res.json({ success: false, message: 'DB-Migration fehlgeschlagen.', err })
      console.error(err)

      return
    }

    res.json({ success: true, message: 'DB-Migration erfolgreich.', result })
  })

  router.get('/seed', async function(req, res){
    let result

    try {
      let result = await db.seed.run()
    } catch(err){
      res.json({ success: false, message: 'DB-Seed fehlgeschlagen.', err })
      console.error(err)

      return
    }

    res.json({ success: true, message: 'DB-Seed erfolgreich.', result })
  })

  return router
}
