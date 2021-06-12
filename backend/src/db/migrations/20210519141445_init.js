exports.up = (knex) => {
  return knex.schema.createTable('users', (users) => {
    users.increments('id')
    users.string('username', 255).unique().notNullable()
    users.string('password', 255).notNullable()
    users.boolean('isAdmin').notNullable().defaultTo(false)
    users.timestamps(true, true)
    console.info('DB | Migration: init | Table users created.')
  }).createTable('sessions', (sessions) => {
    sessions.increments('id')
    sessions.integer('user').unsigned().references('users.id').notNullable()
    sessions.string('token').unique().notNullable()
    sessions.timestamps(true, true)
    console.info('DB | Migration: init | Table sessions created.')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('users').dropTable('sessions')
}
