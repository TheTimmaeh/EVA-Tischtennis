const router = require('express').Router({ mergeParams: true })
let db

module.exports = (_db) => {

  db = _db

  const { generateToken, authenticateToken, optionalAuthenticateToken } = require('../../helpers/jwt')(db)

  // Index
  router.get('/', getAllAssociationTeams)

  // Create
  router.post('/', authenticateToken, authenticateToken, createAssociationTeam)

  // Get (one associationTeam)
  router.get('/:associationTeamId', getAssociationTeam)

  // Update
  router.post('/:associationTeamId', authenticateToken, updateAssociationTeam)

  // Delete
  router.delete('/:associationTeamId', authenticateToken, deleteAssociationTeam)

  // AssociationTeamMembers
  router.use('/:associationTeamId/members', require('./associationTeamMembers')(db))

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

async function getAllAssociationTeams(req, res){
  try {
    let data = await db.qb({ select: (req.user?.isAdmin ? select.admin : select.guest), from: 'association_teams', where: { association: req.params.associationId }, ...req.query })

    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}

async function getAssociationTeam(req, res){
  let data = (await db.first(req.user?.isAdmin ? select.admin : select.guest).from('association_teams').where({ id: req.params.associationTeamId }))
  res.json({ success: true, data })
}

async function createAssociationTeam(req, res){
  try {
    result = await db('association_teams').insert({
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
    let data = await db('association_teams').where({ id: result[0] }).first()

    try {
      result = await db('team_members').insert([
        { team: data.id, position: 'E1' },
        { team: data.id, position: 'E2' },
        { team: data.id, position: 'E3' },
        { team: data.id, position: 'D1', position_type: 'double' },
        { team: data.id, position: 'D2', position_type: 'double' },
      ])
    } catch(err){
      if(err.code === 'ER_DUP_ENTRY'){
        res.json({ success: false, message: `Es existieren bereits Team Mitglieder für die Team ID ${data.id}.` })
      } else {
        res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
        console.error({ ...err })
      }

      return
    }
    res.json({ success: true, message: `Vereinsmannschaft wurde angelegt.`, data, teamId: data.id })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (2)' })
  }
}

async function updateAssociationTeam(req, res){
  let result

  try {
    result = await db('association_teams').where({ id: req.params.associationTeamId }).update({
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
    let data = (await db.first(select.admin).from('association_teams').where({ id: req.params.associationTeamId }))

    res.json({ success: true, message: 'Vereinsmanschaftsdaten wurden aktualisiert.', data })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (4)' })
  }
}

async function deleteAssociationTeam(req, res){

  try {
    result = await db('association_teams').where({ id: req.params.associationTeamId }).del()
  } catch(err){
    if(err.code === 'ER_ROW_IS_REFERENCED_2'){
      res.json({ success: false, message: `Dieses Team ist in Benutzung und kann daher nicht gelöscht werden!` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }
    return
  }

  res.json({ success: true, message: 'Die Daten des Teams wurden gelöscht.' })

}
