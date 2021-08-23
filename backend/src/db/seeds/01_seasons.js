exports.seed = (knex) => {
  return knex('seasons').del().then(() => {
    return knex('seasons').insert([
      { id: 1, year: 2021, season: 'su', title: 'Sommer 2021', description: 'Sommer Saison 2021' },
      { id: 2, year: 2021, season: 'wi', title: 'Winter 2021', description: 'Winter Saison 2021' },
    ])
  })
}
