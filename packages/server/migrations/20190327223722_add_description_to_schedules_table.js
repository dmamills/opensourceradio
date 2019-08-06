exports.up = function(knex, Promise) {
  return knex.schema.table('schedules', function(t) {
      t.string('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('schedules', function(t) {
      t.dropColumn('description');
  });
};