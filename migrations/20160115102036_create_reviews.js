
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', function(table){
    table.increments();
    table.timestamps();
    table.string('reviewer_name')
    table.date('date')
    table.integer('rating')
    table.integer('restaurant_id')
    table.text('review')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews');
};
