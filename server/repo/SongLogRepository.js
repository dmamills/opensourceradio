const knex = require('knex')(require('../knexfile').development);
const tableName = 'song_log';

const { ROOT_AUDIO_PATH } = require('../util');

class SongLogRepository {
  static latest() {
    return knex.select('*')
      .from(tableName)
      .orderBy('created_at', 'DESC')
      .limit(1);
  }

  static count() {
    return knex.count('id')
      .from(tableName)
      .first()
      .then(res => res['count(`id`)'])
  }

  static removeAll() {
    return knex(tableName).truncate();
  }

  static vaccum() {
    return knex.schema.raw("VACUUM");
  }

  static latestSong() {
    return knex.select('file_name')
      .from(tableName)
      .orderBy('created_at', 'DESC')
      .limit(1)
      .then((result) => {
        if(!result || !result[0].file_name) return '';
        return result[0].file_name.replace(ROOT_AUDIO_PATH, '');
      })
  }
}

module.exports = SongLogRepository;
