exports.up = (knex) => {
  return knex.schema.createTable('associations', (associations) => {
    associations.increments('id')
    associations.string('name', 255).notNullable()
    associations.integer('year', 4).notNullable()
    associations.string('location', 255).notNullable()
    associations.string('description', 255)
    associations.string('street', 255)
    associations.string('streetnumber', 255)
    associations.integer('zipcode', 5)
    associations.string('city', 255)
    associations.string('state', 255)
    associations.string('country', 2)
    associations.integer('board').unsigned().references('persons.id')
    associations.string('phone', 255)
    associations.string('mail', 255)
    associations.string('url', 255)
    history.timestamps(true, true)
    console.info('DB | Migration: associations | Table associations created.')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('associations')
}
