const knex = require('knex')
const db = knex(require('./knexfile')[process.env.NODE_ENV])

db.qb = (data) => {
  let query = db

  let whereCount = 0

  if(data.select) query = query.select(data.select)
  if(data.distinct) query = query.select(data.distinct)
  if(data.first) query = query.first(data.first)
  if(data.from) query = query.from(data.from)
  if(data.filter){
    let filter = JSON.parse(data.filter)

    if(filter.lookupRow && filter.type && filter.query){
      if(filter.type == 'like'){

        if(typeof filter.lookupRow === 'string') filter.lookupRow = [filter.lookupRow]

        let queries = filter.query.split(/[^a-z\u00C0-\u017F]+/i).filter((q) => q.length > 0)

        if(queries.length > 0){
          query.where((subquery) => {
            filter.lookupRow.forEach((r) => {
              queries.forEach((q) => {
                if(++whereCount == 1) subquery.where(r, 'like', `%${q}%`)
                else                  subquery.orWhere(r, 'like', `%${q}%`)
              })
            })
          })
        }
      } else if(filter.type == 'exact'){
        // Do exact search
      }
    }
  }
  if(data.where){
    if(++whereCount == 1) query = query.where(data.where)
    else                  query = query.andWhere(data.where)
  }
  if(data.whereIn){
    Object.keys(data.whereIn).forEach((column) => {
      if(++whereCount == 1) query = query.whereIn(column, data.whereIn[column])
      else                  query = query.andWhereIn(column, data.whereIn[column])
    })
  }
  if(data.order) query = query.orderBy(data.order)
  if(data.limit) query = query.limit(data.limit)
  if(data.offset) query = query.offset(data.offset)

  return query
}

module.exports = db
