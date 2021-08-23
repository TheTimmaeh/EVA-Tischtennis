const router = require('express').Router({ mergeParams: true })
let db

module.exports = (_db) => {

  db = _db

  const { generateToken, authenticateToken, optionalAuthenticateToken } = require('../../helpers/jwt')(db)

  // Index
  router.get('/', getAssociationTeamMembers)

  // Update
  router.post('/', optionalAuthenticateToken, updateAssociationTeamMembers)

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
  let data

  try {
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
  } catch(err){
    if(err.code === 'ER_DUP_ENTRY'){
      res.json({ success: false, message: `Es existiert bereits dieser Eintrag.` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }

    return
  }

  res.json({ success: !!data, data })
}
