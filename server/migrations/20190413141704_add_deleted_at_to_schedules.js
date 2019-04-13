exports.up = function(knex, Promise) {
  return knex.schema.table('schedules', function(t) {
      t.datetime('deleted_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('schedules', function(t) {
      t.dropColumn('deleted_at');
  });
};