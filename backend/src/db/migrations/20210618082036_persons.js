exports.up = (knex) => {
  return knex.schema.createTable('persons', (persons) => {
    persons.increments('id')
    persons.string('name', 50).notNullable()
    persons.string('surname', 50).notNullable()
    persons.string('gender', 1)
    persons.date('birthday')
    persons.string('street', 50)
    persons.string('streetnumber', 10)
    persons.integer('zipcode', 5)
    persons.string('city', 50)
    persons.string('state', 2)
    persons.string('country', 2)
    persons.string('phone', 50)
    persons.string('mail', 50)
    persons.timestamps(true, true)

    console.info('DB | Migration: persons | Table persons created.')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('persons')
}
