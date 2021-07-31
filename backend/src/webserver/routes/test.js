const router = require('express').Router()
const bcrypt = require('bcrypt')
let db

module.exports = (_db) => {

  db = _db

  const { generateToken, authenticateToken } = require('../../helpers/jwt')(db)

  // Index
  router.get('/', test)

  return router
}

async function test(req, res){
  let home
  let visitor

  let data = {
    home: 5,
    visitor: 5,
  }

  try {
    home = await db('team_members').where({ team: data.home })
    visitor = await db('team_members').where({ team: data.visitor })
  } catch(err){
    console.error(err)
  }

  console.log({ home, visitor })

  res.json({ home, visitor })
}
