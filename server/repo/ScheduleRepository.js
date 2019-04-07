const knex = require('knex')(require('../knexfile').development);
const moment = require('moment');
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const sortByDate = (s1, s2) => moment(s1.start_time, DATE_FORMAT).diff(moment(s2.start_time, DATE_FORMAT));

const tableName = 'schedules';
const fields = ['id', 'name', 'description', 'start_time', 'length', 'playlist', 'created_at', 'updated_at'];

class ScheduleRepository {
  static get(id) {
    return knex(this.tableName)
      .where('id', id)
      .first();
  }

  static getAll() {
    console.log(tableName);
    return knex(fields)
    .from(tableName)
    .then(schedules => schedules.sort(sortByDate));
  }

  static todays() {
    return knex(fields)
    .from(tableName)
    .where('start_time', '>=', moment().startOf('day').format(DATE_FORMAT))
    .where('start_time', '<=', moment().endOf('day').format(DATE_FORMAT))
    .then(schedules => schedules.sort(sortByDate));
  }

  static remove(id) {
    return knex(this.tableName)
    .where('id', id)
    .delete()
  }

  static update(id, schedule) {
    return knex(this.tableName)
    .update(schedule)
    .where('id', id);
  }
}

module.exports = ScheduleRepository;