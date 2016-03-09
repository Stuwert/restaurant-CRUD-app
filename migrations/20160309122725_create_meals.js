
exports.up = function(knex, Promise) {
  return knex.schema.createTable('meals', function(table){
    table.increments();
    table.string('name');
    table.integer('restaurant_id');
    table.json('ingredients');
    table.boolean('public');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('meals');
};
