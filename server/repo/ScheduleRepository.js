const knex = require('knex')(require('../knexfile').development);
const moment = require('moment');
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const sortByDate = (s1, s2) => moment(s1.start_time, DATE_FORMAT).diff(moment(s2.start_time, DATE_FORMAT));

const tableName = 'schedules';
const fields = ['id', 'name', 'description', 'start_time', 'length', 'playlist', 'created_at', 'updated_at'];

const ts = () => moment().format(DATE_FORMAT); 

const createTimestamps = () => ({
  created_at: ts(),
  updated_at: ts(),
});

const updateTimestamp = () => ({
  updated_at: ts(),
})

class ScheduleRepository {
  static get(id) {
    return knex(tableName)
      .where('id', id)
      .first();
  }

  static getAll() {
    return knex(fields)
    .from(tableName)
    .where('deleted_at', null)
    .then(schedules => schedules.sort(sortByDate));
  }

  static todays() {
    return knex(fields)
    .from(tableName)
    .where('start_time', '>=', moment().startOf('day').format(DATE_FORMAT))
    .where('start_time', '<=', moment().endOf('day').format(DATE_FORMAT))
    .where('deleted_at', null)
    .then(schedules => schedules.sort(sortByDate));
  }

  static create(schedule) {
    schedule = {
      ...schedule,
      ...createTimestamps()
    };

    return knex(tableName)
      .insert(schedule);
  }

  static remove(id) {
    return knex(tableName)
    .where('id', id)
    .update({
      deleted_at: moment().format(DATE_FORMAT),
    });
  }

  static update(id, schedule) {
    schedule = {
      ...schedule,
      ...updateTimestamp(),
    };

    return knex(tableName)
    .where('id', id)
    .update(schedule);
  }
}

module.exports = ScheduleRepository;