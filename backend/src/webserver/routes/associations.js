const router = require('express').Router()
const { generateToken, authenticateToken } = require('../../helpers/jwt')
let db

module.exports = (_db) => {

  db = _db

  // Index
  router.get('/', getAllAssociations)

  // Create
  router.post('/', authenticateToken, createAssociation)

  // Get (one association)
  router.get('/:association', getAssociation)

  // Update
  router.post('/:association', authenticateToken, updateAssociation)

  // Delete
  router.delete('/:association', authenticateToken, deleteAssociation)

  return router
}


async function getAllAssociations(req, res){
  let associations = (await db.select().from('associations'))
  res.json({associations})
}

async function getAssociation(req, res){
  let association = (await db.select().from('associations').where({ name: req.params.association }))
  res.json({association})
}

async function createAssociation(req, res){
  db('associations').insert({
    name: req.name,
    year: req.year,
    location: req.location,
    description: req.description,
    street: req.street,
    streetnumber: req.streetnumber,
    zipcode: req.zipcode,
    city: req.city,
    state: req.state,
    country: req.country,
    board: req.board,
    phone: req.phone,
    mail: req.mail,
    website: req.website,
  })

  res.json({})
}

async function updateAssociation(req, res){
  db('associations').where({ name: req.params.association }).update({
    year: req.year,
    location: req.location,
    description: req.description,
    street: req.street,
    streetnumber: req.streetnumber,
    zipcode: req.zipcode,
    city: req.city,
    state: req.state,
    country: req.country,
    board: req.board,
    phone: req.phone,
    mail: req.mail,
    website: req.website,
  })

  res.json({})
}

async function deleteAssociation(req, res){
  await db('associations').where({ name: req.params.association }).del()
  res.json({})
}
