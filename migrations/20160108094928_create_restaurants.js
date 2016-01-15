
exports.up = function(knex, Promise) {
  return knex.schema.createTable('locations', function(table){
    table.increments();
    table.string('name');
    table.json('location');
    table.string('cuisine');
    table.integer('rating');
    table.string('img');
    table.string('city');
    table.string('state');
    table.text('description');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('locations')
};
