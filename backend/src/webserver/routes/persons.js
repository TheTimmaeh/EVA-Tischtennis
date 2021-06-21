const router = require('express').Router()
let db

module.exports = (_db) => {

  db = _db

  const { generateToken, authenticateToken, optionalAuthenticateToken } = require('../../helpers/jwt')(db)

  // Index
  router.get('/', optionalAuthenticateToken, getAllPersons)

  // Create
  router.post('/', authenticateToken, createPerson)

  // Get (one person)
  router.get('/:person', optionalAuthenticateToken, getPerson)

  // Update
  router.post('/:person', authenticateToken, updatePerson)

  // Delete
  router.delete('/:person', authenticateToken, deletePerson)

  return router
}

const select = {
  admin: ['*'],
  guest: ['id', 'name', 'surname'],
}

async function getAllPersons(req, res){
  try {
    let data = await db.qb({ select: (req.user?.isAdmin ? select.admin : select.guest), from: 'persons', ...req.query })

    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}

async function getPerson(req, res){
  let data = (await db.first(req.user?.isAdmin ? select.admin : select.guest).from('persons').where({ id: req.params.person }))
  res.json({ success: true, data })
}

async function createPerson(req, res){
  let result

  try {
    result = await db('persons').insert({
      name: req.body.name,
      surname: req.body.surname,
      gender: req.body.gender,
      birthday: req.body.birthday,
      street: req.body.street,
      streetnumber: req.body.streetnumber,
      zipcode: req.body.zipcode,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      phone: req.body.phone,
      mail: req.body.mail,
    })
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits eine Person ${req.body.name} ${req.body.surname}.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }

  if(!!result?.[0]){
    let data = await db('users').where({ id: result[0] }).first()

    res.json({ success: true, message: 'Person wurde angelegt.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (2)' })
  }
}

async function updatePerson(req, res){
  let result

  try {
    result = await db('persons').where({ id: req.params.person }).update({
      name: req.body.name,
      surname: req.body.surname,
      gender: req.body.gender,
      birthday: req.body.birthday,
      street: req.body.street,
      streetnumber: req.body.streetnumber,
      zipcode: req.body.zipcode,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      phone: req.body.phone,
      mail: req.body.mail,
    })
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits eine Person ${req.body.name} ${req.body.surname}.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }

  if(result === 1){
    let data = (await db.first(select.admin).from('persons').where({ id: req.params.person }))

    res.json({ success: true, message: 'Personendaten wurden aktualisiert.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (4)' })
  }
}

async function deletePerson(req, res){
  await db('persons').where({ id: req.params.person }).del()
  res.json({})
}
