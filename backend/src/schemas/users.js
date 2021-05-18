module.exports = async (schema) => {
  try {
    await schema.createTable('users', table => {
      table.increments('id')
      table.string('user_name')
    }).createTable('accounts', table => {
      table.increments('id')
      table.string('account_name')
      table.integer('user_id').unsigned().references('users.id')
    })
  } catch(e) {
    console.error(e)
  }
}
