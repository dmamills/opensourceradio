const knex = require('knex')(require('../knexfile').development);

const tableName = 'news';
const fields = ['id', 'title', 'content', 'created_at', 'updated_at'];

const { sortByDate } = require('../util');

class NewsRepository {
  static getAll() {
    return knex(fields)
    .from(tableName)
    .where('deleted_at', null)
    .then(news => news.sort(sortByDate));
  }
}

module.exports = NewsRepository;