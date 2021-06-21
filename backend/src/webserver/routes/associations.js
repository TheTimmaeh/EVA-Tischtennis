const router = require('express').Router()
let db

module.exports = (_db) => {

  db = _db

  const { generateToken, authenticateToken, optionalAuthenticateToken } = require('../../helpers/jwt')(db)

  // Index
  router.get('/',optionalAuthenticateToken, getAllAssociations)

  // Create
  router.post('/', authenticateToken, createAssociation)

  // Get (one association)
  router.get('/:association', optionalAuthenticateToken, getAssociation)

  // Update
  router.post('/:association', authenticateToken, updateAssociation)

  // Delete
  router.delete('/:association', authenticateToken, deleteAssociation)

  return router
}

const select = {
  admin: ['*'],
  guest: ['*'],
}


async function getAllAssociations(req, res){
  try {
    let data = await db.qb({ select: (req.user?.isAdmin ? select.admin : select.guest), from: 'associations', ...req.query })

    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}


async function getAssociation(req, res){
  let data = (await db.first(req.user?.isAdmin ? select.admin : select.guest).from('associations').where({ id: req.params.association }))
  res.json({ success: true, data })
}

async function createAssociation(req, res){
  let result

  try {
    result = await db('associations').insert({
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
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits ein Verein ${req.body.name}.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }

  if(!!result?.[0]){
    let data = await db('associations').where({ id: result[0] }).first()

    res.json({ success: true, message: 'Verein wurde angelegt.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (2)' })
  }
}

async function updateAssociation(req, res){
  let result

  try {
    result = await db('associations').where({ id: req.params.association }).update({
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
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits ein Verein ${req.body.name}.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }

  if(result === 1){
    let data = (await db.first(select.admin).from('associations').where({ id: req.params.association }))

    res.json({ success: true, message: 'Vereinsdaten wurden aktualisiert.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (4)' })
  }
}


async function deleteAssociation(req, res){
  await db('associations').where({ name: req.params.association }).del()
  res.json({})
}
