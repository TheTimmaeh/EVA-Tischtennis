const knex = require('knex')
const db = knex(require('./knexfile')[process.env.NODE_ENV])

module.exports = db
