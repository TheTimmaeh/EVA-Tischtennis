const router = require('express').Router()
const { generateToken, authenticateToken } = require('../../helpers/jwt')
let db

module.exports = (_db) => {
  db = _db

  // Index
  router.get('/', getAllCompetitions)

  // Get (one competition)
  router.get('/:competition', getCompetition)

  // Create
  router.post('/', authenticateToken, createCompetition)

  // Update
  router.post('/:competition', authenticateToken, updateCompetition)

  // Delete
  router.delete('/:competition', authenticateToken, deleteCompetition)

  return router
}

async function getAllCompetitions(req, res){
  let competitions = (await db.select().from('competitions'))
  res.json({competitions})
}

async function getCompetition(req, res){
  let competition = (await db.select().from('competitions').where({ id: req.params.competition }))
  res.json({competition})
}

async function createCompetition(req, res){
  db('competitions').insert({
    name: req.name,
    startdate: req.startdate,
    enddate: req.enddate,
    playerclass: req.playerclass,
    street: req.street,
    streetnumber: req.streetnumber,
    zipcode: req.zipcode,
    city: req.city,
    state: req.state,
    country: req.country,
    phone: req.phone,
    mail: req.mail,
    website: req.website,
  })

  res.json({})
}

async function updateCompetition(req, res){
  db('competitions').where({ id: req.params.competition }).update({
    name: req.name,
    startdate: req.startdate,
    enddate: req.enddate,
    playerclass: req.playerclass,
    street: req.street,
    streetnumber: req.streetnumber,
    zipcode: req.zipcode,
    city: req.city,
    state: req.state,
    country: req.country,
    phone: req.phone,
    mail: req.mail,
    website: req.website,
  })

  res.json({})
}

async function deleteCompetition(req, res){
  await db('competitions').where({ id: req.params.competition }).del()
  res.json({})
}
