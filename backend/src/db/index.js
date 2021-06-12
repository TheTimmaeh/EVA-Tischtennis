const knex = require('knex')
const db = knex(require('./knexfile')[process.env.NODE_ENV])

db.qb = (data) => {
  let query = db

  if(data.select) query = query.select(data.select)
  if(data.first) query = query.first(data.first)
  if(data.from) query = query.from(data.from)
  if(data.filter)
    if(data.filter instanceof Array) query = query.where(...data.filter)
    else if(data.filter instanceof Object) query = query.where(data.filter)
  if(data.order) query = query.orderBy(data.order)
  if(data.limit) query = query.limit(data.limit)
  if(data.offset) query = query.offset(data.offset)

  return query
}

module.exports = db
