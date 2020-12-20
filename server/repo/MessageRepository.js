const knex = require('knex')(require('../knexfile').development);
const tableName = 'messages';

class MessageRepository {
  static latest() {
    return knex.select('name', 'message', knex.raw('created_at as timestamp'), 'active_song')
    .from(tableName)
    .orderBy('created_at', 'DESC')
    .limit(50);
  }

  static create(message, songName = '') {
    return knex(tableName)
      .insert({
        name: message.name,
        created_at: message.timestamp,
        message: message.message,
        active_song: songName
      });
  }
}

module.exports = MessageRepository;