const knex = require('knex')(require('../knexfile').development);

const tableName = 'news';
const fields = ['id', 'title', 'content', 'created_at', 'updated_at'];

const { sortByDate } = require('../util');

class NewsRepository {
  static get(id) {
    return knex(tableName)
      .where('id', id)
      .first();
  }

  static getAll() {
    return knex(fields)
    .from(tableName)
    .where('deleted_at', null)
    .then(news => news.sort(sortByDate));
  }

  static create(news) {
    return knex(tableName)
      .insert({
        ...news,
        ...createTimestamps()
      });
  }

  static remove(id) {
    return knex(tableName)
    .where('id', id)
    .update({
      deleted_at: moment().format(DATE_FORMAT),
    });
  }
}

module.exports = NewsRepository;