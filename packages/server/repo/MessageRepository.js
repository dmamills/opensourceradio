const knex = require('knex')(require('../knexfile').development);
const tableName = 'messages';

class MessageRepository {
  static latest() {
    return knex.select('name', 'message', knex.raw('created_at as timestamp'))
    .from(tableName)
    .orderBy('created_at', 'DESC')
    .limit(50);
  }

  static create(message) {
    return knex(tableName)
      .insert({
        name: message.name,
        created_at: message.timestamp,
        message: message.message
      });
  }
}

module.exports = MessageRepository;