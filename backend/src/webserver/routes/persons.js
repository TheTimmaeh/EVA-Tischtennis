const router = require('express').Router()
const { generateToken, authenticateToken } = require('../../helpers/jwt')

module.exports = (db) => {

  // Index
  router.get('/', async (req, res) => {
    let persons = getAllPersons(req, res)
    res.json({persons})
  })

  // Create
  router.post('/', authenticateToken, async (req, res) => {
    createPerson(req, res)
    res.json({})
  })

  // Get (one person)
  router.get('/:person', async (req, res) => {
    let person = getPerson(req, res)
    res.json({person})
  })

  // Update
  router.post('/:person', authenticateToken, async (req, res) => {
    updatePerson(req, res)
    res.json({})
  })

  // Delete
  router.delete('/:person', authenticateToken, async (req, res) => {
    deletePerson(req, res)
    res.json({})
  })

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