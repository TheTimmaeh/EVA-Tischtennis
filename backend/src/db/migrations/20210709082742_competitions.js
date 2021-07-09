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
    competitions.integer('player_class').unsigned().references('classes.id')
    competitions.integer('season').unsigned().references('seasons.id')
    competitions.timestamps(true, true)
    console.info('DB | Migration: competitions | Table competitions created.')

  // Verein gegen Verein
  }).createTable('encounters', (encounters) => {
    encounters.increments('id')
    encounters.integer('competition').unsigned().references('competitions.id')
    encounters.integer('game_stage').unsigned().references('game_stages.id')
    encounters.integer('home').unsigned().references('association_teams.id')
    encounters.integer('visitor').unsigned().references('association_teams.id')
    encounters.datetime('datetime')
    encounters.timestamps(true, true)
    console.info('DB | Migration: competitions | Table encounters created.')

  // Spieler gegen Spieler
  }).createTable('matches', (matches) => {
    matches.increments('id')
    matches.integer('encounter').unsigned().references('encounters.id')
    matches.integer('home_player').unsigned().references('team_members.id')
    matches.integer('visitor_player').unsigned().references('team_members.id')
    matches.integer('referee').unsigned().references('users.id')
    matches.integer('sets')
    matches.integer('home_score')
    matches.integer('visitor_score')
    matches.timestamps(true, true)
    console.info('DB | Migration: competitions | Table matches created.')

  // Sets
  }).createTable('sets', (sets) => {
    sets.increments('id')
    sets.integer('match').unsigned().references('matches.id')
    sets.integer('home_score')
    sets.integer('visitor_score')
    sets.timestamps(true, true)
    console.info('DB | Migration: competitions | Table sets created.')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('game_stages').dropTable('competitions').dropTable('encounters').dropTable('matches').dropTable('sets')
}
