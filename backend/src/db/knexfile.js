module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: 'knex',
      password: 'eva_tischtennis',
      database: 'eva_tischtennis',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: (process.env.DOCKER === 'true' ? '/app/src/db/migrations' : './migrations'),
    },
    seeds: {
      directory: (process.env.DOCKER === 'true' ? '/app/src/db/seeds' : './seeds'),
    },
  },

  staging: { },

  production: { },
}
