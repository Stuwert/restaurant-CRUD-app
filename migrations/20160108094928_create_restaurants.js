
exports.up = function(knex, Promise) {
  return knex.schema.createTable('locations', function(table){
    table.increments();
    table.timestamps();
    table.string('name');
    table.json('location');
    table.string('cuisine');
    table.integer('rating');
    table.string('img');
    table.integer('house_number')
    table.string('street1')
    table.string('street2')
    table.string('city');
    table.string('state');
    table.integer('zip');
    table.integer('neighborhood_id')
    table.text('description');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('locations')
};
