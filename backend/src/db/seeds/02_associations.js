exports.seed = (knex) => {
  return knex('associations').del().then(() => {
    return knex('associations').insert([
      {
        id: 1,
        name: 'THM Gießen',
        year: 1998,
        location: 'Campus Gießen',
        description: 'Tischtennis Verein der THM - Campus Gießen',
        street: 'Wiesenstraße',
        streetnumber: '14',
        zipcode: 35390,
        city: 'Gießen',
        state: 'HE',
        country: 'DE',
        board: 3,
        phone: '0641 3090',
        mail: 'tischtennis@thm.de',
        url: 'https://thm.de/tischtennis',
      },
      {
        id: 2,
        name: 'THM Friedberg',
        year: 1998,
        location: 'Campus Friedberg',
        description: 'Tischtennis Verein der THM - Campus Friedberg',
        street: 'Wilhelm-Leuschner-Straße',
        streetnumber: '13',
        zipcode: 61169,
        city: 'Friedberg',
        state: 'HE',
        country: 'DE',
        board: 70,
        phone: '06031 6040',
        mail: 'tischtennis@thm.de',
        url: 'https://thm.de/tischtennis',
      },
    ])
  })
}
