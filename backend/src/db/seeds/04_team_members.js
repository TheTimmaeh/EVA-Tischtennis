exports.seed = (knex) => {
  return knex('team_members').del().then(() => {
    return knex('team_members').insert([
      { id: 1, team: 1, member: 2, position_type: 'single', position: 'E1' },
      { id: 2, team: 1, member: 5, position_type: 'single', position: 'E2' },
      { id: 3, team: 1, member: 8, position_type: 'single', position: 'E3' },
      { id: 4, team: 1, member: 9, position_type: 'double', position: 'D1' },
      { id: 5, team: 1, member: 10, position_type: 'double', position: 'D2' },      
      { id: 6, team: 2, member: 3, position_type: 'single', position: 'E1' },
      { id: 7, team: 2, member: 1, position_type: 'single', position: 'E2' },
      { id: 8, team: 2, member: 4, position_type: 'single', position: 'E3' },
      { id: 9, team: 2, member: 6, position_type: 'double', position: 'D1' },
      { id: 10, team: 2, member: 7, position_type: 'double', position: 'D2' },
      { id: 11, team: 3, member: 70, position_type: 'single', position: 'E1' },
      { id: 12, team: 3, member: 71, position_type: 'single', position: 'E2' },
      { id: 13, team: 3, member: 72, position_type: 'single', position: 'E3' },
      { id: 14, team: 3, member: 75, position_type: 'double', position: 'D1' },
      { id: 15, team: 3, member: 81, position_type: 'double', position: 'D2' },
      { id: 16, team: 4, member: 51, position_type: 'single', position: 'E1' },
      { id: 17, team: 4, member: 56, position_type: 'single', position: 'E2' },
      { id: 18, team: 4, member: 57, position_type: 'single', position: 'E3' },
      { id: 19, team: 4, member: 58, position_type: 'double', position: 'D1' },
      { id: 20, team: 4, member: 60, position_type: 'double', position: 'D2' },
    ])
  })
}
