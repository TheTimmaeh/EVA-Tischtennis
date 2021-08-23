exports.up = (knex) => {
  return knex.schema.createTable('association_teams', (association_teams) => {
    association_teams.increments('id')
    association_teams.string('name', 50).notNullable()
    association_teams.integer('association').notNullable().unsigned().references('associations.id')
    association_teams.integer('season').notNullable().unsigned().references('seasons.id')
    association_teams.integer('player_class').notNullable().unsigned().references('player_classes.id')
    association_teams.timestamps(true, true)
    console.info('DB | Migration: association_teams | Table association_teams created.')
  }).createTable('team_members', (team_members) => {
    team_members.increments('id')
    team_members.integer('team').notNullable().unsigned().references('association_teams.id')
    team_members.integer('member').nullable().unsigned().references('persons.id')
    team_members.enum('position_type', ['single', 'double']).notNullable().defaultTo('single')
    team_members.enum('position', ['E1', 'E2', 'E3', 'D1', 'D2']).notNullable()
    team_members.unique(['team', 'position'])
    team_members.unique(['team', 'position_type', 'member'])
    team_members.timestamps(true, true)
    console.info('DB | Migration: association_teams | Table team_members created.')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('association_teams').dropTable('team_members')
}
