exports.seed = (knex) => {
  return knex('game_stages').del().then(() => {
    return knex('game_stages').insert([
      { id: 1, name: 'Vorentscheid', sets: 5 },
      { id: 2, name: 'Gruppenphase', sets: 5 },
      { id: 3, name: 'Achtelfinale', sets: 5 },
      { id: 4, name: 'Viertelfinale', sets: 5 },
      { id: 5, name: 'Halbfinale', sets: 5 },
      { id: 6, name: 'Finale', sets: 5 },
    ])
  })
}
