exports.up = (knex) => {
  return knex.schema.createTable('game_stages', (game_stages) => {
    game_stages.increments('id')
    game_stages.string('name', 50).notNullable()
    game_stages.integer('sets').notNullable()
    game_stages.timestamps(true, true)
    console.info('DB | Migration: competitions | Table game_stages created.')

  // Tunier / Rahmenbedingungen
  }).createTable('competitions', (competitions) => {
    competitions.increments('id')
    competitions.string('name', 50).notNullable()
    competitions.string('description', 255)
    competitions.integer('player_class').notNullable().unsigned().references('player_classes.id')
    competitions.integer('season').notNullable().unsigned().references('seasons.id')
    competitions.timestamps(true, true)
    console.info('DB | Migration: competitions | Table competitions created.')

  // Verein gegen Verein
  }).createTable('encounters', (encounters) => {
    encounters.increments('id')
    encounters.integer('competition').notNullable().unsigned().references('competitions.id')
    encounters.integer('game_stage').notNullable().unsigned().references('game_stages.id')
    encounters.integer('home').notNullable().unsigned().references('association_teams.id')
    encounters.integer('visitor').notNullable().unsigned().references('association_teams.id')
    encounters.datetime('datetime').notNullable()
    encounters.timestamps(true, true)
    console.info('DB | Migration: competitions | Table encounters created.')

  // Spieler gegen Spieler
  }).createTable('matches', (matches) => {
    matches.increments('id')
    matches.integer('encounter').notNullable().unsigned().references('encounters.id')
    matches.integer('home_player_1').notNullable().unsigned().references('persons.id')
    matches.integer('home_player_2').nullable().unsigned().references('persons.id')
    matches.integer('visitor_player_1').notNullable().unsigned().references('persons.id')
    matches.integer('visitor_player_2').nullable().unsigned().references('persons.id')
    matches.integer('referee').nullable().unsigned().references('users.id')
    matches.integer('sets').notNullable()
    matches.integer('home_score')
    matches.integer('visitor_score')
    matches.timestamps(true, true)
    console.info('DB | Migration: competitions | Table matches created.')

  // Sets
  }).createTable('sets', (sets) => {
    sets.increments('id')
    sets.integer('match').notNullable().unsigned().references('matches.id')
    sets.integer('home_score').notNullable().default(0)
    sets.integer('visitor_score').notNullable().default(0)
    sets.timestamps(true, true)
    console.info('DB | Migration: competitions | Table sets created.')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('game_stages').dropTable('competitions').dropTable('encounters').dropTable('matches').dropTable('sets')
}
