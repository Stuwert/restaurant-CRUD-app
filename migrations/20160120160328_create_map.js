
exports.up = function(knex, Promise) {
  return knex.schema.createTable('neighborhoods', function(table){
    table.increments()
    table.timestamps()
    table.string('name')
    table.string('epicenter')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('neighborhoods');
};
