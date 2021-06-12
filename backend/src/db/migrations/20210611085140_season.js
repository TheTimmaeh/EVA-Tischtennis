exports.up = (knex) => {
  return knex.schema.createTable('season', (season) => {
    season.increments('id')
    season.integer('year', 4).notNullable()
    season.string('season', 2).notNullable()
    season.unique(['year', 'season'])
    season.string('title', 255)
    season.string('description', 255)
    console.info('DB | Migration: season | Table season created.')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('season')
}