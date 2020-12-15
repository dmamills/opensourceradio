exports.up = function(knex, Promise) {
    return knex.schema.table('schedules', function(t) {
        t.boolean('shuffle').defaultTo(false);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table('schedules', function(t) {
        t.dropColumn('shuffle');
    });
  };