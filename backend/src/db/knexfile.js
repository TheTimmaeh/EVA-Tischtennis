module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      // user: 'knex',
      // password: 'knex',
      user: 'root',
      password: 'example',
      database: 'eva_tischtennis',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  staging: { },

  production: { },
}
