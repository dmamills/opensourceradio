
exports.up = function(knex, done) {
  knex.schema.createTable('messages', schema => {
    schema.increments();
    schema.string('name');
    schema.string('message');
    schema.index(['created_at']);
    schema.string('ip_address');
    schema.timestamps();
  }).then(done);
};

exports.down = function(knex, done) {
  knex.schema.dropTable('messages').then(done);  
};
