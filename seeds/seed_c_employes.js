var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile')[environment];
var db = require('knex')(config)

exports.seed = function(knex, Promise) {
  return db('locations').select().then(function(restaurants){
    return Promise.join(
      // Deletes ALL existing entries
      knex('employees').del(),

      // Inserts seed entries
      knex('employees').insert({first_name: 'Bing', last_name: 'Bong', position: 'Junior Executive', performance: 3, restaurant_id: restaurants[0].id }),
      knex('employees').insert({first_name: 'Jane', last_name: 'Smith', position: 'Employee' , performance: 2, restaurant_id: restaurants[1].id }),
      knex('employees').insert({first_name: 'John', last_name: 'Blane' , position: 'Manager', performance: 5, restaurant_id: restaurants[2].id})
    );
  })
};
