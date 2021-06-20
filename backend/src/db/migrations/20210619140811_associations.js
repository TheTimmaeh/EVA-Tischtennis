exports.up = (knex) => {
  return knex.schema.createTable('associations', (associations) => {
    associations.increments('id')
    associations.string('name', 50).notNullable()
	associations.integer('year', 4).notNullable()
	associations.string('location', 50).notNullable()
	associations.string('description', 255)
	associations.string('street', 50)
	associations.string('streetnumber', 10)
	associations.integer('zipcode', 5) 
	associations.string('city', 50)
	associations.string('state', 2)
	associations.string('country', 2)
	associations.string('phone', 50)
	associations.string('mail', 50)
	associations.integer('board').unsigned().references('persons.id')
	associations.string('url', 100)
	
    console.info('DB | Migration: associations | Table associations created.')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('associations')
}
