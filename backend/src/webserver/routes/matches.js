const router = require('express').Router({ mergeParams: true })
let db

module.exports = (_db) => {

  db = _db

  const { generateToken, authenticateToken, optionalAuthenticateToken } = require('../../helpers/jwt')(db)

  // Index
  router.get('/', optionalAuthenticateToken, getAllMatches)

  // Get (one match)
  router.get('/:matchId', optionalAuthenticateToken, getMatch)

  // Update
  router.post('/:matchId', authenticateToken, updateMatch)

  // Delete
  router.delete('/:matchId', authenticateToken, deleteMatch)

  return router
}

const select = {
  admin: ['*'],
  guest: ['*'],
}

async function updateMatch(req, res){
  let result

  try {
    result = await db('matches').where({ id: req.params.matchId }).update({
      referee: req.body.referee,
    })
  } catch(err){
    res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
    console.error({ ...err })

    return
  }

  if(result === 1){
    let match
    let sets

    try {
      match = await db.first(select.admin).from('matches').where({ id: req.params.matchId })

      sets = await db('sets').where({ match: match.id })

      if(sets.length < 1){
        let result = await db('sets').insert([
          { match: match.id },
          { match: match.id },
          { match: match.id },
          { match: match.id },
          { match: match.id },
        ])

        sets = await db('sets').where({ match: match.id })
      }
    } catch(err){
      console.error(err)
    }

    res.json({ success: true, message: 'Spieldaten wurden aktualisiert.', data: { match, sets } })
  } else {
    res.json({ success: false, message: 'Ein unbekannter Fehler ist aufgetreten. (4)' })
  }
}

async function getAllMatches(req, res){
  try {
    let matches = await db.qb({ select: (req.user?.isAdmin ? select.admin : select.guest), from: 'matches', where:{ encounter: req.params.encounterId}, ...req.query })
    let matchIds =  matches.map((e) => e.id)
    let sets = await db.qb({ select: ['id', 'home_score', 'visitor_score', 'match'], from: 'sets', whereIn: {match: matchIds}, ...req.query })
    let playerIds = matches.map((e) => [e.home_player_1, e.home_player_2, e.visitor_player_1, e.visitor_player_2 ]).flat()
    let players = await db.qb({ select: ['id', 'name', 'surname'], from: 'persons', whereIn: {id: playerIds}, ...req.query })
    matches = matches.map((e) => {
      e.home_player_1 = players.find((p) => p.id === e.home_player_1)
      e.home_player_2 = players.find((p) => p.id === e.home_player_2)
      e.visitor_player_1 = players.find((p) => p.id === e.visitor_player_1)
      e.visitor_player_2 = players.find((p) => p.id === e.visitor_player_2)
      e.sets = sets.filter((s) => s.match === e.id )
      return e
    })
  
    res.json({ success: true, data: matches })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}


async function getMatch(req, res){

  try {
    let data = await db.qb({ first: (req.user?.isAdmin ? select.admin : select.guest), from: 'matches', where: {id: req.params.matchId }, ...req.query })

    res.json({ success: true, data })
  } catch(err){
    console.error(err.message)
    res.status(500).json({ success: false, message: `An error has occured. (${err.code})` })
  }
}

async function deleteMatch(req, res){

  try {
    result = await db('matches').where({ id: req.params.matchId }).del()
  } catch(err){
    if(err.code === 'ER_ROW_IS_REFERENCED_2'){
      res.json({ success: false, message: `Dieses Spiel ist in Benutzung und kann daher nicht gelöscht werden!` })
    } else {
      res.json({ success: false, message: `Ein unbekannter Fehler ist aufgetreten. (${err.code})` })
      console.error({ ...err })
    }
    return
  }

  res.json({ success: true, message: 'Die Daten des Spiels wurden gelöscht.' })

}
