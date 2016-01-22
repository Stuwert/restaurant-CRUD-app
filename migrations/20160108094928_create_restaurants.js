
exports.up = function(knex, Promise) {
  return knex.schema.createTable('locations', function(table){
    table.increments();
    table.string('name');
    table.string('cuisine');
    table.string('img');
    table.string('street1')
    table.string('street2')
    table.string('city');
    table.string('state');
    table.integer('zip');
    table.integer('neighborhood_id');
    table.json('epicenter')
    table.text('description');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('locations')
};
