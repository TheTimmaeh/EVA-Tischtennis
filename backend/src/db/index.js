const knex = require('knex')
const db = knex(require('./knexfile')[process.env.NODE_ENV])

db.qb = (data) => {
  let query = db

  if(data.select) query = query.select(data.select)
  if(data.first) query = query.first(data.first)
  if(data.from) query = query.from(data.from)
  if(data.filter){
    let filter = JSON.parse(data.filter)

    if(filter.lookupRow && filter.type && filter.query){
      if(filter.type == 'like'){

        if(typeof filter.lookupRow === 'string') filter.lookupRow = [filter.lookupRow]

        let queries = filter.query.split(/[^a-z\u00C0-\u017F]+/i).filter((q) => q.length > 1)
        let count = 0

        filter.lookupRow.forEach((r) => {
          queries.forEach((q) => {
            if(++count == 1) query.where(r, 'like', `%${q}%`)
            else             query.orWhere(r, 'like', `%${q}%`)
          })
        })
      } else if(filter.type == 'exact'){
        // Do exact search
      }
    }
  }
  if(data.order) query = query.orderBy(data.order)
  if(data.limit) query = query.limit(data.limit)
  if(data.offset) query = query.offset(data.offset)

  return query
}

module.exports = db
