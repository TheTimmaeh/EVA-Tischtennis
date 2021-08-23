exports.seed = (knex) => {
  return knex('competitions').del().then(() => {
    return knex('competitions').insert([
      {
        id: 1,
        name: 'Hessen Cup 2021',
        description: 'Diesmal geht es um alles!',
        player_class: 1,
        season: 2,
      },
    ])
  })
}
