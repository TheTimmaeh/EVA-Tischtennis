const router = require('express').Router()
const { generateToken, authenticateToken } = require('../../helpers/jwt')

module.exports = (db) => {

  // Index
  router.get('/', async (req, res) => {
    let Associations = getAllAssociations(req, res)
    res.json({Associations})
  })

  // Create
  router.post('/', authenticateToken, async (req, res) => {
    createAssociation(req, res)
    res.json({})
  })

  // Get (one association)
  router.get('/:association', async (req, res) => {
    let association = getAssociation(req, res)
    res.json({association})
  })

  // Update
  router.post('/:association', authenticateToken, async (req, res) => {
    updateAssociation(req, res)
    res.json({})
  })

  // Delete
  router.delete('/:association', authenticateToken, async (req, res) => {
    deleteAssociation(req, res)
    res.json({})
  })

  return router
}


async function getAllAssociations(req, res){
  let associations = (await db.select().from('associations')) 
  res.json({associations})
}

async function getAssociation(req, res){
  let association = (await db.select().from('associations').where('name', req.name)) 
  res.json({association})
}

async function createAssociation(req, res){
  db('associations').insert([
                              {name: req.name}, 
                              {year: req.year},
                              {location:req.location},
                              {description:req.description},
                              {street:req.street},
                              {streetnumber:req.streetnumber},
                              {zipcode:req.zipcode},
                              {city:req.city},
                              {state:req.state},
                              {country:req.country},
                              {board:req.board},
                              {phone:req.phone},
                              {mail:req.mail},
                              {website:req.website},
                            ])
  res.json({})
}

async function updateAssociation(req, res){
  db('associations').where('name', req.name).update([
                                                      {year: req.year},
                                                      {location:req.location},
                                                      {description:req.description},
                                                      {street:req.street},
                                                      {streetnumber:req.streetnumber},
                                                      {zipcode:req.zipcode},
                                                      {city:req.city},
                                                      {state:req.state},
                                                      {country:req.country},
                                                      {board:req.board},
                                                      {phone:req.phone},
                                                      {mail:req.mail},
                                                      {website:req.website},
                                                    ])
  res.json({})
}

async function deleteAssociation(req, res){
  await db('associations').where('name', req).del()
  res.json({})
}