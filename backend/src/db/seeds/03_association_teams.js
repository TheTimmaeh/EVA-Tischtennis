exports.seed = (knex) => {
  return knex('association_teams').del().then(() => {
    return knex('association_teams').insert([
      {
        id: 1,
        name: 'THM Gießen Herren',
        association: 1,
        season: 2,
        player_class: 1,
      },
      {
        id: 2,
        name: 'THM Gießen Damen',
        association: 1,
        season: 2,
        player_class: 2,
      },
      {
        id: 3,
        name: 'THM Friedberg Herren',
        association: 2,
        season: 2,
        player_class: 1,
      },
      {
        id: 4,
        name: 'THM Friedberg Damen',
        association: 2,
        season: 2,
        player_class: 2,
      },
    ])
  })
}
