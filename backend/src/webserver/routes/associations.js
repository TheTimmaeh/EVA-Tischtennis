const router = require('express').Router({ mergeParams: true})
let db

module.exports = (_db) => {

  db = _db

  const { generateToken, authenticateToken, optionalAuthenticateToken } = require('../../helpers/jwt')(db)

  // Index
  router.get('/', optionalAuthenticateToken, getAllAssociations)

  // Create
  router.post('/', authenticateToken, createAssociation)

  // Get (one association)
  router.get('/:associationId', optionalAuthenticateToken, getAssociation)

  // Update
  router.post('/:associationId', authenticateToken, updateAssociation)

  // Delete
  router.delete('/:associationId', authenticateToken, deleteAssociation)

  // Members
  router.get('/:associationId/members', optionalAuthenticateToken, getAssociationMembers)

  // AssociationTeams
  router.use('/:associationId/teams', require('./associationTeams')(db))



  return router
}

const select = {
  admin: ['*'],
  guest: ['*'],
}

const memberSelect = {
  admin: ['*'],
  guest: ['id', 'name', 'surname'],
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
  let data = (await db.first(req.user?.isAdmin ? select.admin : select.guest).from('associations').where({ id: req.params.associationId }))
  res.json({ success: true, data })
}

async function createAssociation(req, res){
  let result

  try {
    result = await db('associations').insert({
      name: req.body.name,
      year: req.body.year,
      location: req.body.location,
      description: req.body.description,
      street: req.body.street,
      streetnumber: req.body.streetnumber,
      zipcode: req.body.zipcode,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      board: req.body.board,
      phone: req.body.phone,
      mail: req.body.mail,
      url: req.body.url,
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
    result = await db('associations').where({ id: req.params.associationId }).update({
      year: req.body.year,
      location: req.body.location,
      description: req.body.description,
      street: req.body.street,
      streetnumber: req.body.streetnumber,
      zipcode: req.body.zipcode,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      board: req.body.board,
      phone: req.body.phone,
      mail: req.body.mail,
      url: req.body.url,
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
    let data = (await db.first(select.admin).from('associations').where({ id: req.params.associationId }))

    res.json({ success: true, message: 'Vereinsdaten wurden aktualisiert.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (4)' })
  }
}


async function deleteAssociation(req, res){

  try {
    result = await db('associations').where({ id: req.params.associationId }).del()
  } catch(err){
    if(err.code === 'ER_ROW_IS_REFERENCED_2'){
      res.json({ success: false, message: `Dieser Verein ist in Benutzung und kann daher nicht gelöscht werden!` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }
    return
  }

  res.json({ success: true, message: 'Die Daten des Vereins wurden gelöscht.' })

}

async function getAssociationMembers(req, res){
  try {
    let teams = await db.qb({ select: ['id', 'name'], from: 'association_teams', where: { association: req.params.associationId } })
    let teamIds = teams.map((t) => t.id)

    let members = await db.qb({ distinct: ['member', 'team', 'position'], from: 'team_members', whereIn: { team: teamIds } })
    let memberIds = members.map((m) => m.member)

    let data = await db.qb({ select: (req.user?.isAdmin ? memberSelect.admin : memberSelect.guest), from: 'persons', whereIn: { id: memberIds }, ...req.query })

    data = data.map((person) => Object.assign(person, { teams: members.filter((m) => m.member == person.id).map((m) => {
      return { id: m.team, team: teams.find((t) => t.id == m.team).name, position: m.position }
    })}))

    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}
