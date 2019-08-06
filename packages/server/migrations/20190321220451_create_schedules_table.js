
exports.up = function(knex, done) {
   knex.schema.createTable('schedules', schema => {
    schema.increments();
    schema.string('name');
    schema.integer('length');
    schema.datetime('start_time');
    schema.string('playlist');
    schema.timestamps();
  }).then(done);
};

exports.down = function(knex, done) {
  knex.schema.dropTable('schedules').then(done);  
};
