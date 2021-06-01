const router = require('express').Router()
const { generateToken, authenticateToken } = require('../../helpers/jwt')

module.exports = (db) => {

  // Index
  router.get('/', async (req, res) => {
    let seasons = getAllSeasons(req, res)
    res.json({seasons})
  })

  // Create
  router.post('/', authenticateToken, async (req, res) => {
    createSeason(req, res)
    res.json({})
  })

  // Get (one saison) -> Ich glaube das brauchen wir gar nicht
  router.get('/:season', async (req, res) => {
    res.json({})
  })

  // Update -> Ich glaube das brauchen wir auch nicht
  router.post('/:season', authenticateToken, async (req, res) => {
    res.json({})
  })

  // Delete
  router.delete('/:season', authenticateToken, async (req, res) => {
    res.json({})
  })

  return router
}


async function getAllSeasons(req, res){
  let referees = (await db.select().from('season')) 
  res.json({referees})
}

async function createSeason(req, res){
  db('season').insert([{year: req.year}, {season: req.season},])
  res.json({})
}

async function deleteSeason(req, res){
  await db('season').where([{'year': req.year}, {'season': req.season} ]).del()
  res.json({})
}
