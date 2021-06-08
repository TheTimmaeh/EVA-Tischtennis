exports.up = (knex) => {
  return knex.schema.createTable('history', (history) => {
    history.increments('id')
    history.string('event_type', 255).unique().notNullable()
    history.string('reference1', 255).notNullable()
    history.string('reference2', 255).notNullable()
    history.integer('user').unsigned().references('users.id').notNullable()
    history.timestamps(true, true)
    console.info('DB | Migration: history | Table history created.')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('history')
}
