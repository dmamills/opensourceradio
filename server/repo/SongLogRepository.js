const knex = require('knex')(require('../knexfile').development);
const tableName = 'song_log';

class SongLogRepository {
  static latest() {
    return knex.select('*')
      .from(tableName)
      .orderBy('created_at', 'DESC')
      .limit(1);
  }
}

module.exports = SongLogRepository;
