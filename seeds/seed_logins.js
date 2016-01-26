
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({user_name: 'admin', user_password: 'admin', access_level: 2}),
    knex('users').insert({user_name: 'user', user_password: 'user', access_level: 1})
  );
};
