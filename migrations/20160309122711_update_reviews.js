
exports.up = function(knex, Promise) {
  return knex.schema.table('reviews', function(table){
    table.dropColumn('restaurant_id')
    table.integer('meal_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('reviews', function(table){
    table.dropColumn('meal_id')
    table.integer('restaurant_id')
  })
};
