
exports.up = function(knex, Promise) {
  return knex.schema.createTable('neighborhoods', function(table){
    table.increments()
    table.timestamps()
    table.string('name')
    table.integer('house_number')
    table.string('street')
    table.string('city')
    table.string('state')
    table.integer('zip')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('neighborhoods');
};
