exports.up = function(knex, Promise) {
  return knex.schema.table('messages', function(t) {
      t.string('active_song').defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('messages', function(t) {
      t.dropColumn('active_song');
  });
};