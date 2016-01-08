
exports.up = function(knex, Promise) {
  return knex.schema.createTable('mexican', function(table){
    table.increments();
    table.string('name');
    table.json('location');
    table.string('cuisine');
    table.integer('rating');
    table.string('img');
    table.string('description');
  })
};

exports.down = function(knex, Promise) {

};
