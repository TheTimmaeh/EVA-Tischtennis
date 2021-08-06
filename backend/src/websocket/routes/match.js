module.exports = (db, socket) => {

  socket.on('getSet', async (data) => {
    if(!data.match) return

    let sets = await db('sets').where({ match: data.match })

    let current_set = 0
    let home_score = 0
    let visitor_score = 0

    sets.some((set) => {
      if(getWinner(set) === 'home') home_score++
      else if(getWinner(set) === 'visitor') visitor_score++
      else {
        current_set = set
        return true
      }
      return false
    })

    if(current_set === 0 || Math.max(home_score, visitor_score) === 3){
      socket.emit('setData', { error: 'There is already a winner for this match. No further sets needed.' })
    } else {
      // Hole Spieler/Verein
      await writeHistory('setStart', current_set.id)
      socket.emit('setData', current_set)
    }
  })

  socket.on('action', async (data) => {

    if(data.type === 'score'){
      if(!data.set || !data.player || !['home', 'visitor'].includes(data.player)) return

      let result = await db('sets').where({ id: data.set }).increment(`${data.player}_score`, 1)

      console.log(result)

      await writeHistory('setScore', data.set, data.player)

      socket.emit('confirmAction', data)

      let set = await db('sets').first().where({ id: data.set })

      let winner = getWinner(set)

      if(winner){
        console.log('setEnd', winner)
        await writeHistory('setEnd', data.set)
        socket.emit('setEnd', winner)
      }
    }
  })

  async function writeHistory(event_type, reference1, reference2 = null){
    return await db('history').insert({ event_type, reference1, reference2, user: socket.user.id })
  }
}

function getWinner(set){
  // First to reach 11
  if((Math.min(set.home_score, set.visitor_score) < 10 && Math.max(set.home_score, set.visitor_score) > 10)

  // First to lead with 2 points
  || Math.min(set.home_score, set.visitor_score) > 9 & Math.abs(set.home_score - set.visitor_score) > 1){
    if(set.home_score > set.visitor_score) return 'home'
    return 'visitor'
  }

  return null
}
