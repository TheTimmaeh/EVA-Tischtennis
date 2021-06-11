exports.seed = (knex) => {
  return knex('users').del().then(() => {
    return knex('users').insert([
      { id: 1, username: 'Admin', password: '$2b$10$8p4SaHdDKhBH6MwRl3NI6eP/30ual.EVtocO7Ew3rZDmhVIk0FoMC', isAdmin: true },
      { id: 2, username: 'Schiri', password: '$2b$10$974hWTA0Ybj3RcQSvKGqiuowlP/SbTUxnZEjyYiJ/HRm9l6JWpSda' },
    ])
  })
}
