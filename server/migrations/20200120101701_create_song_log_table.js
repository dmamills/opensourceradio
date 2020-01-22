
exports.up = function(knex, done) {
  knex.schema.createTable('song_log', schema => {
    schema.increments();
    schema.string('schedule_id');
    schema.datetime('schedule_start_time');
    schema.datetime('schedule_stop_time');
    schema.string('schedule_playlist', 100000);
    schema.string('file_name', 100000);
    schema.string('ffmpeg_command', 100000);
    schema.index(['created_at']);
    schema.timestamps();
  }).then(done);
};

exports.down = function(knex, done) {
  knex.schema.dropTable('song_log').then(done);
};
