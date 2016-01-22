
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('employees').del(),

    // Inserts seed entries
    knex('employees').insert({id: 1, first_name: 'Bing', last_name: 'Bong', position: 'Junior Executive', performance: 3, restaurant_id: 1}),
    knex('employees').insert({id: 2, first_name: 'Jane', last_name: 'Smith', position: 'Employee' , performance: 2, restaurant_id: 2 }),
    knex('employees').insert({id: 3, first_name: 'John', last_name: 'Blane' , position: 'Manager', performance: 5, restaurant_id: 3})
    );
};
