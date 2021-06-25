exports.up = (knex) => {
  return knex.schema.createTable('classes', (classes) => {
	classes.increments('id')
	classes.string('name', 50).notNullable()
	classes.integer('age_from', 2)
	classes.integer('age_to', 2)
	classes.string('gender', 1)
	classes.timestamps(true, true)
	
    console.info('DB | Migration: classes | Table classes created.')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('classes')
}
