
exports.seed = function(knex, Promise) {
    return Promise.join(
      // Deletes ALL existing entries
      knex('neighborhoods').del(),

      // Inserts seed entries
      knex('neighborhoods').insert({name: "Burnsville", epicenter: {lat: 44.7439681, lng: -93.2907666}, county: "Dakota County", city: "Burnsville" , state: "MN" }),
      knex('neighborhoods').insert({name: "Denver", epicenter: {lat: 39.7612652, lng: -105.003157}, county: "Denver County", city: "Denver", state: "CO"}),
      knex('neighborhoods').insert({name: "Suncadia", epicenter: {lat:47.208469 , lng: -121.0217707}, county: "Kittitas County", city: "Suncadia", state: "WA" })
    );

};
