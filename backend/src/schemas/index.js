const usersSchema = require('./users')

module.exports = async (knex) => {
  await Promise.all([
    usersSchema(knex.schema),
  ]).then((values) => {
    console.log(values)
  }).catch(error => {
    console.error(error.message)
  })
}
