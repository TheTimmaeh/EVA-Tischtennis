module.exports = (db, socket) => {

  socket.on('getSet', async (data) => {
    if(!data.match) return

    let sets = await db('sets').where({ match: data.match })

    let current_set = 0
    let home_score = 0
    let visitor_score = 0

    sets.some((set) => {
      if(getSetWinner(set) === 'home') home_score++
      else if(getSetWinner(set) === 'visitor') visitor_score++
      else {
        current_set = set
        return true
      }
      return false
    })

    if(current_set === 0 || Math.max(home_score, visitor_score) === 3){
      socket.emit('setData', { error: 'There is already a winner for this match. No further sets needed.' })
    } else {
      
      try {
        current_set.match = await db.qb({ first: '*', from: 'matches', where: { id: data.match }})
      } catch(err){
        console.error('Match', {err})
      }

      try {
        let players = [current_set.match.home_player_1, current_set.match.home_player_2, current_set.match.visitor_player_1, current_set.match.visitor_player_2]
        players = await db.qb({ select: ['id', 'name', 'surname'], from: 'persons', whereIn: { id: players }})

        current_set.match.home_players = [ current_set.match.home_player_1, current_set.match.home_player_2 ].map((p1) => players.find((p2) => p2.id == p1)).filter((p) => !!p).map((p) => `${p.name} ${p.surname}`).join(' | ')
        current_set.match.visitor_players = [ current_set.match.visitor_player_1, current_set.match.visitor_player_2 ].map((p1) => players.find((p2) => p2.id == p1)).filter((p) => !!p).map((p) => `${p.name} ${p.surname}`).join(' | ')
      } catch(err){
        console.error('Players', {err})
      }

      let encounter

      try {
        encounter = await db.qb({ first: '*', from: 'encounters', where: { id: current_set.match.encounter }})
      } catch(err){
        console.error('Encounter', {err})
      }

      let teams

      try {
        teams = [ encounter.home, encounter.visitor ]
        teams = await db.qb({ select: ['id', 'name'], from: 'association_teams', whereIn: { id: teams }})
      } catch(err){
        console.error('Teams', {err})
      }

      current_set.match.home_team = teams.find((t) => t.id == encounter.home).name
      current_set.match.visitor_team = teams.find((t) => t.id == encounter.visitor).name

      await writeHistory('setStart', current_set.id)
      socket.emit('setData', current_set)
    }
  })

  socket.on('action', async (data) => {
    if(data.type === 'score'){
      if(!data.set || !data.player || !['home', 'visitor'].includes(data.player)) return

      let result = await db('sets').where({ id: data.set }).increment(`${data.player}_score`, 1)

      await writeHistory('setScore', data.set, data.player)

      socket.emit('confirmAction', data)
      socket.broadcast.emit('matchUpdate', data)

      let set = await db('sets').first().where({ id: data.set })

      let setWinner = getSetWinner(set)

      if(setWinner){
        let sets = await db('sets').where({ match: set.match })
        let matchResult = getMatchResult(sets)
        let next

        if(!matchResult.winner){
          let curr =  sets.findIndex((s) => s.id === data.set)
          next = (!!sets[++curr] ? curr : null)
          if(next) sets[next]
        }

        await writeHistory('setEnd', data.set)
        socket.emit('setEnd', { winner: setWinner, nextSet: next })

        if(matchResult.winner){
          let match = await db('matches').where({ id: set.match }).update({ home_score: matchResult.home_score, visitor_score: matchResult.visitor_score })

          socket.broadcast.emit('matchUpdate', { type: 'end', match: set.match, ...matchResult })
          await writeHistory('matchEnd', set.match)
        }
      }
    }
  })

  async function writeHistory(event_type, reference1, reference2 = null){
    return await db('history').insert({ event_type, reference1, reference2, user: socket.user.id })
  }
}

function getSetWinner(set){
  // First to reach 11
  if((Math.min(set.home_score, set.visitor_score) < 10 && Math.max(set.home_score, set.visitor_score) > 10)

  // First to lead with 2 points
  || Math.min(set.home_score, set.visitor_score) > 9 & Math.abs(set.home_score - set.visitor_score) > 1){
    if(set.home_score > set.visitor_score) return 'home'
    return 'visitor'
  }

  return null
}

function getMatchResult(sets){
  let home_score = 0
  let visitor_score = 0
  let winner = null

  sets.forEach((s) => {
    let setWinner = getSetWinner(s)

    if(setWinner === 'home') home_score++
    else if(setWinner === 'visitor') visitor_score++
  })

  if(home_score == 3) winner = 'home'
  if(visitor_score == 3) winner = 'visitor'

  return { home_score, visitor_score, winner }
}
