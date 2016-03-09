
exports.up = function(knex, Promise) {
  return knex.schema.table('meals', function(table){
    table.text('description')
    table.string('img')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('meals', function(table){
    table.dropColumn('description')
    table.dropColumn('img')
  })
};
