exports.up = (knex) => {
  return knex.schema.createTable('association_teams', (association_teams) => {
    association_teams.increments('id')
    association_teams.string('name', 50).notNullable()
    association_teams.integer('association').unsigned().references('associations.id')
    association_teams.integer('season').unsigned().references('seasons.id')
    association_teams.integer('playerClass').unsigned().references('classes.id')
    association_teams.timestamps(true, true)
    console.info('DB | Migration: association_teams | Table association_teams created.')
  }).createTable('team_members', (team_members) => {
    team_members.increments('id')
    team_members.integer('team').unsigned().references('association_teams.id')
    team_members.integer('member').unsigned().references('persons.id')
    team_members.string('position', 2)
    team_members.unique(['team', 'position'])
    team_members.timestamps(true, true)
    console.info('DB | Migration: association_teams | Table team_members created.')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('association_teams').dropTable('team_members')
}