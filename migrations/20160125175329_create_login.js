
exports.up = function(knex, Promise) {
  return knex.scehma.createTable('users', function(table){
    table.increments();
    table.string('user_name')
    table.string('user_password')
    table.integer('access_level')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
