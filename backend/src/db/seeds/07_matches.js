exports.seed = (knex) => {
  return knex('matches').del().then(() => {
    return knex('matches').insert([
      {
        id: 1,
        encounter: 1,
        home_player_1: 2,
        visitor_player_1: 71,
        sets: 5,
      },
      {
        id: 2,
        encounter: 1,
        home_player_1: 5,
        visitor_player_1: 70,
        sets: 5,
      },
      {
        id: 3,
        encounter: 1,
        home_player_1: 8,
        visitor_player_1: 72,
        sets: 5,
      },
      {
        id: 4,
        encounter: 1,
        home_player_1: 9,
        home_player_2: 10,
        visitor_player_1: 75,
        visitor_player_2: 81,
        sets: 5,
      },
    ])
  })
}
