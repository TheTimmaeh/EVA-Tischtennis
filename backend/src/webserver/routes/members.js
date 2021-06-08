const router = require('express').Router()
const { generateToken, authenticateToken } = require('../../helpers/jwt')
let db

module.exports = (_db) => {

  db = _db

  // Index
  router.get('/', getAllMembers)

  // Create
  router.post('/', authenticateToken, createMember)

  // Get (one member)
  router.get('/:member', getMember)

  // Update
  router.post('/:member', authenticateToken, updateMember)

  // Delete
  router.delete('/:member', authenticateToken, deleteMember)

  return router
}

async function getAllMembers(req, res){
  let members = (await db.select().from('members'))
  res.json({members})
}

async function getMember(req, res){
  let member = (await db.select().from('members').where({ id: req.params.member }))
  res.json({member})
}

async function createMember(req, res){
  db('members').insert({
    name: req.name,
    surname: req.surname,
    gender: req.gender,
    birthday: req.birthday,
    association: req.association,
    board: req.board,
    playerclass: req.playerclass,
    team: req.team,
    street: req.street,
    streetnumber: req.streetnumber,
    zipcode: req.zipcode,
    city: req.city,
    state: req.state,
    country: req.country,
    phone: req.phone,
    mail: req.mail,
  })

  res.json({})
}

async function updateMember(req, res){
  db('members').where({ id: req.params.member }).update({
    name: req.name,
    surname: req.surname,
    gender: req.gender,
    birthday: req.birthday,
    association: req.association,
    board: req.board,
    playerclass: req.playerclass,
    team: req.team,
    street: req.street,
    streetnumber: req.streetnumber,
    zipcode: req.zipcode,
    city: req.city,
    state: req.state,
    country: req.country,
    phone: req.phone,
    mail: req.mail,
  })

  res.json({})
}

async function deleteMember(req, res){
  await db('members').where({ id: req.params.member }).del()
  res.json({})
}
