exports.seed = (knex) => {
  return knex('player_classes').del().then(() => {
    return knex('player_classes').insert([
      { id: 1, name: 'Herren', age_from: 18, age_to: 99, gender: 'm' },
      { id: 2, name: 'Damen', age_from: 18, age_to: 99, gender: 'f' },
    ])
  })
}
