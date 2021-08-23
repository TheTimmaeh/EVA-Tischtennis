exports.seed = (knex) => {
  return knex('encounters').del().then(() => {
    return knex('encounters').insert([
      {
        id: 1,
        competition: 1,
        game_stage: 1,
        home: 1,
        visitor: 3,
        datetime: '2021-08-21',
      },
    ])
  })
}
