const router = require('express').Router()
const { generateToken, authenticateToken } = require('../../helpers/jwt')

module.exports = (db) => {

  // Index
  router.get('/', getAllPersons)

  // Create
  router.post('/', authenticateToken, createPerson)

  // Get (one person)
  router.get('/:person', getPerson)

  // Update
  router.post('/:person', authenticateToken, updatePerson)

  // Delete
  router.delete('/:person', authenticateToken, deletePerson)

  return router
}


async function getAllPersons(req, res){
  let persons = (await db.select().from('persons')) 
  res.json({persons})
}

async function getPerson(req, res){
  let person = (await db.select().from('persons').where('id', req.id)) 
  res.json({person})
}

async function createPerson(req, res){
  db('persons').insert([
                              {name: req.name}, 
                              {surname: req.surname},
                              {location:req.location},
                              {gender:req.gender},
                              {birthday:req.birthday},
                              {association:req.association},
                              {street:req.street},
                              {streetnumber:req.streetnumber},
                              {zipcode:req.zipcode},
                              {city:req.city},
                              {state:req.state},
                              {country:req.country},
                              {website:req.website},
                              {phone:req.phone},
                              {mail:req.mail},
                          ])
  res.json({})
}

async function updatePerson(req, res){
  db('persons').where('name', req.name).update([
                                                  {name: req.name}, 
                                                  {surname: req.surname},
                                                  {location:req.location},
                                                  {gender:req.gender},
                                                  {birthday:req.birthday},
                                                  {association:req.association},
                                                  {street:req.street},
                                                  {streetnumber:req.streetnumber},
                                                  {zipcode:req.zipcode},
                                                  {city:req.city},
                                                  {state:req.state},
                                                  {country:req.country},
                                                  {website:req.website},
                                                  {phone:req.phone},
                                                  {mail:req.mail},
                                                ])
  res.json({})
}

async function deletePerson(req, res){
  await db('persons').where('id', req.id).del()
  res.json({})
}