exports.up = (knex) => {
  return knex.schema.createTable('seasons', (seasons) => {
    seasons.increments('id')
    seasons.integer('year', 4).notNullable()
    seasons.string('seasons', 2).notNullable()
    seasons.unique(['year', 'seasons'])
    seasons.string('title', 255)
    seasons.string('description', 255)
    console.info('DB | Migration: seasons | Table seasons created.')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('seasons')
}
