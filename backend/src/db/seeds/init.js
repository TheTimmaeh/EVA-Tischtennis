exports.seed = (knex) => {
  return knex('users').del().then(() => {
    return knex('users').insert([
      { id: 1, username: 'Admin', password: 'admin', isAdmin: true },
      { id: 2, username: 'Schiri', password: 'schiri' },
    ])
  })
}
