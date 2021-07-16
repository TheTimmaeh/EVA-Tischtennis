const router = require('express').Router()
let db

module.exports = (_db) => {

  db = _db

  const { generateToken, authenticateToken } = require('../../helpers/jwt')(db)

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

const select = {
  admin: ['*'],
  guest: ['*'],
}


async function getAllAssociationTeams(req, res){
  try {
    let data = await db.qb({ select: (req.user?.isAdmin ? select.admin : select.guest), from: 'association_teams', ...req.query })

    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}

async function getAssociationTeam(req, res){
  let data = (await db.first(req.user?.isAdmin ? select.admin : select.guest).from('association_teams').where({ id: req.params.associationTeam }))
  res.json({ success: true, data })
}

async function createAssociationTeam(req, res){
  db('association_teams').insert({
    name: req.nameAssociationClass,
    season: req.season,
    year: req.year,
    playerClass: req.playerClass,
    association: req.associationId,
  })

  res.json({})
}

async function updateAssociationTeam(req, res){
  db('association_teams').where({ id: req.params.associationTeam }).update({
    name: req.nameAssociationClass,
    season: req.season,
    year: req.year,
    playerClass: req.playerClass,
    association: req.associationId,
  })

  res.json({})
}

async function deleteAssociationTeam(req, res){
  await db('association_teams').where({ id: req.params.associationTeam }).del()
  res.json({})
}
