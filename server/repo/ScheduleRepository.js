const knex = require('knex')(require('../knexfile').development);
const moment = require('moment');

const tableName = 'schedules';
const fields = ['id', 'name', 'description', 'start_time', 'length', 'playlist', 'shuffle', 'created_at', 'updated_at'];

const { createTimestamps, updateTimestamp, sortByDate, DATE_FORMAT } = require('../util');

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
    const currentDOW = moment().format('dddd');
    return knex(fields)
    .from(tableName)
    .where('deleted_at', null)
    .then(schedules => {
      return schedules.filter(schedule => {
        const sDOW = moment(schedule.start_time).format('dddd');
        return sDOW === currentDOW;
      })
    })
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
