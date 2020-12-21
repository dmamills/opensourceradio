
exports.up = function(knex, done) {
  knex.schema.createTable('news', schema => {
    schema.increments();
    schema.string('title');
    schema.string('content');
    schema.index(['created_at']);
    schema.datetime('deleted_at');
    schema.timestamps();
  }).then(done);
};

exports.down = function(knex, done) {
  knex.schema.dropTable('news').then(done);
};
