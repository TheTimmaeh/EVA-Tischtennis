const router = require('express').Router({ mergeParams: true })
let db

module.exports = (_db) => {

  db = _db

  const { generateToken, authenticateToken, optionalAuthenticateToken } = require('../../helpers/jwt')(db)

  // Index
  router.get('/', getAssociationTeamMembers)

  // Create
  router.post('/', authenticateToken, authenticateToken, createAssociationTeamMember)

  // Get (one associationTeam)
  router.get('/:associationTeamMemberId', getAssociationTeamMember)

  // Update
  router.post('/:associationTeamMemberId', optionalAuthenticateToken, updateAssociationTeamMembers)

  // Delete
  router.delete('/:associationTeamMemberId', authenticateToken, deleteAssociationTeamMember)


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


async function getAllAssociationTeamMembers(req, res){
  try {

    // For das aktuelle Team: team = req.params.associationTeamId
    // For den aktuellen Verein: komplizierter!

    req.query.where = Object.assign({ team: req.params.associationTeamId }, req.query.where)

    let data = await db.qb({ select: (req.user?.isAdmin ? select.admin : select.guest), from: 'team_members', ...req.query })

    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}

async function getAssociationTeamMember(req, res){
  let data = (await db.first(req.user?.isAdmin ? select.admin : select.guest).from('team_members').where({ id: req.params.associationTeamMemberId }))
  res.json({ success: true, data })
}

async function createAssociationTeamMember(req, res){
  try {
    result = await db('team_members').insert({
      name: req.body.nameAssociationClass,
      season: req.body.season,
      playerClass: req.body.playerClass,
      association: req.params.associationId,
    })
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits eine Vereinsmannschaft für diesen Verein/Saison/Spielerklasse.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }

  if(!!result?.[0]){
    let data = await db('team_members').where({ id: result[0] }).first()

    res.json({ success: true, message: 'Vereinsmannschaft wurde angelegt.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (2)' })
  }
}

async function updateAssociationTeamMember(req, res){
  let result

  try {
    result = await db('team_members').where({ id: req.params.associationTeamMemberId }).update({
      name: req.body.nameAssociationClass,
      season: req.body.season,
      playerClass: req.body.playerClass,
    })
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits eine Vereinsmannschaft für diesen Verein/Saison/Spielerklasse.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }

  if(result === 1){
    let data = (await db.first(select.admin).from('team_members').where({ id: req.params.associationTeamMemberId }))

    res.json({ success: true, message: 'Vereinsmanschaftsdaten wurden aktualisiert.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (4)' })
  }
}

async function deleteAssociationTeamMember(req, res){
  await db('team_members').where({ id: req.params.associationTeamMemberId }).del()
  res.json({})
}

async function getAssociationTeamMembers(req, res){

  try {

    let members = await db.qb({ select: ['member', 'team', 'position'], from: 'team_members', where: { team: req.params.associationTeamId  } })
    let memberIds = members.map((m) => m.member)

    let persons = await db.qb({ select: (req.user?.isAdmin ? memberSelect.admin : memberSelect.guest), from: 'persons', whereIn: { id: memberIds }, ...req.query })

    let data = members.map((member) => Object.assign(member, persons.find((p) => p.id == member.member)  ))
    
    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}


async function updateAssociationTeamMembers(req, res){

  try {
    console.log(req.body)
    let E1 = await db('team_members').where({ team: req.params.associationTeamId, position: 'E1' }).update({
      member: req.body.E1
    })

    let E2 = await db('team_members').where({ team: req.params.associationTeamId, position: 'E2' }).update({
      member: req.body.E2
    })

    let E3 = await db('team_members').where({ team: req.params.associationTeamId, position: 'E3' }).update({
      member: req.body.E3
    })

    let D1 = await db('team_members').where({ team: req.params.associationTeamId, position: 'D1' }).update({
      member: req.body.D1
    })

    let D2 = await db('team_members').where({ team: req.params.associationTeamId, position: 'D2' }).update({
      member: req.body.D2
    })

    data = [E1, E2, E3,  D1, D2]
    res.json({ success: true, data })
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits dieser Eintrag.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }
}
