const router = require('express').Router()
const { generateToken, authenticateToken } = require('../../helpers/jwt')

module.exports = (db) => {

  // Index
  router.get('/', getAllSeasons)

  // Create
  router.post('/', authenticateToken, createSeason)

  // // Get (one saison) -> Ich glaube das brauchen wir gar nicht
  // router.get('/:season', async (req, res) => {
  //   res.json({})
  // })
  //
  // // Update -> Ich glaube das brauchen wir auch nicht
  // router.post('/:season', authenticateToken, async (req, res) => {
  //   res.json({})
  // })

  // Delete
  router.delete('/:season', authenticateToken, deleteSeason)

  return router
}


async function getAllSeasons(req, res){
  let seasons = (await db.select().from('season'))
  res.json({seasons})
}

async function createSeason(req, res){
  db('season').insert([
    { year: req.year },
    { season: req.season },
  ])

  res.json({})
}

async function deleteSeason(req, res){
  await db('season').where({ year: req.year, season: req.season }).del()
  res.json({})
}
