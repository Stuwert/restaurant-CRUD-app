
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('locations').del(),

    // Inserts seed entries
    knex('locations').insert({id: 1, name:'Yum Yum Good Times', cuisine: 'mexican', img:'/images/mexican.png', street1: '12417 12th Street East' , street2: null, city: 'Edgewood', zip: '98372', state: 'WA', neighborhood_id: 2, description: 'An eclectic mix of flavors.'}),
    knex('locations').insert({id: 2, name:'Everything is Awesome', cuisine: 'thai', img:'/images/thai.jpg', street1: '12523 12th Street East', street2: null, city: 'Edgewood', zip: '98372', state: 'WA', neighborhood_id: 2, description: 'Wonderful little wine bar.'}),
    knex('locations').insert({id: 3, name:'Binga Banga', cuisine: 'italian', img:'/images/italian.png', street1: '2715 17th Street', street2: null, city: 'Denver', zip: '80211', state: 'CO', neighborhood_id: 1, description: 'Awesome flavors.'})

  );
};
