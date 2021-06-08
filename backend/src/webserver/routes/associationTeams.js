const router = require('express').Router()
const { generateToken, authenticateToken } = require('../../helpers/jwt')
let db

module.exports = (_db) => {

  db = _db

  // Index
  router.get('/', getAllAssociationTeams)

  // Create
  router.post('/', authenticateToken, authenticateToken, createAssociationTeam)

  // Get (one associationTeam)
  router.get('/:associationTeam', getAssociationTeam)

  // Update
  router.post('/:associationTeam', authenticateToken, updateAssociationTeam)

  // Delete
  router.delete('/:associationTeam', authenticateToken, deleteAssociationTeam)

  return router
}


async function getAllAssociationTeams(req, res){
  let associationTeams = (await db.select().from('associationTeams'))
  res.json({associationTeams})
}

async function getAssociationTeam(req, res){
  let associationTeam = (await db.select().from('associationTeams').where({ id: req.params.associationTeam }))
  res.json({associationTeam})
}

async function createAssociationTeam(req, res){
  db('associationTeams').insert({
    nameAssociationClass: req.nameAssociationClass,
    season: req.season,
    year: req.year,
    gender: req.gender,
    nameAssociation: req.nameAssociation,
  })

  res.json({})
}

async function updateAssociationTeam(req, res){
  db('associationTeams').where({ id: req.params.associationTeam }).update({
    nameAssociationClass: req.nameAssociationClass,
    season: req.season,
    year: req.year,
    gender: req.gender,
    nameAssociation: req.nameAssociation,
  })

  res.json({})
}

async function deleteAssociationTeam(req, res){
  await db('associationTeams').where({ id: req.params.associationTeam }).del()
  res.json({})
}
