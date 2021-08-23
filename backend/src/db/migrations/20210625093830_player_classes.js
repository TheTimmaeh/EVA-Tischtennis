exports.up = (knex) => {
  return knex.schema.createTable('player_classes', (player_classes) => {
    player_classes.increments('id')
    player_classes.string('name', 50).notNullable()
    player_classes.integer('age_from', 2)
    player_classes.integer('age_to', 2)
    player_classes.string('gender', 1)
    player_classes.timestamps(true, true)

    console.info('DB | Migration: player_classes | Table player_classes created.')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('player_classes')
}
