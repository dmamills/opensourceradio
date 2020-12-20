const knex = require('knex')(require('../knexfile').development);
const tableName = 'song_log';

const { ROOT_AUDIO_PATH, getFiles, filesToFolders, sanitizeFilename } = require('../util');


class SongLogRepository {
  static latest() {
    return knex.select('*')
      .from(tableName)
      .orderBy('created_at', 'DESC')
      .limit(1);
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
