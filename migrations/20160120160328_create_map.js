
exports.up = function(knex, Promise) {
  return knex.schema.createTable('neighborhoods', function(table){
    table.increments()
    table.string('name')
    table.json('epicenter')
    table.string('county')
    table.string('city')
    table.string('state')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('neighborhoods');
};
