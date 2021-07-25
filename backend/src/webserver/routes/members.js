const router = require('express').Router()
let db

module.exports = (_db) => {

  db = _db

  const { generateToken, authenticateToken } = require('../../helpers/jwt')(db)

  // Index
  router.get('/', getAllMembers)

  // // Create
  // router.post('/', authenticateToken, createMember)

  // // Get (one member)
  // router.get('/:member', getMember)

  // // Update
  // router.post('/:member', authenticateToken, updateMember)

  // // Delete
  // router.delete('/:member', authenticateToken, deleteMember)

  return router
}

async function getAllMembers(req, res){
  //funktioniert noch nicht
  // man hat die id der association
  //hole alle accociationTeamsIDs wo association gleich der id
  // hole alle teamMember wo teamid in den geholten

  try {
    let teams = await db.qb({ select: ['id', 'name'], from: 'association_teams', where: { association: req.params.associationId } })
    let teamIds = teams.map((t) => t.id)

    let members = await db.qb({ distinct: ['member', 'team', 'position'], from: 'team_members', whereIn: { team: teamIds } })
    let memberIds = members.map((m) => m.member)

    let data = await db.qb({ select: (req.user?.isAdmin ? memberSelect.admin : memberSelect.guest), from: 'persons', whereIn: { id: memberIds }, ...req.query })

    data = data.map((person) => Object.assign(person, { teams: members.filter((m) => m.member == person.id).map((m) => {
      return { id: m.team, team: teams.find((t) => t.id == m.team).name, position: m.position }
    })}))
    console.log(data)

    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
  
}
