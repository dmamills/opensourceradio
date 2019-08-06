const moment = require('moment');
const knex = require('knex')(require('../../knexfile').development);
const SQL_FORMAT = 'YYYY-MM-DD hh:mm:ss';

class Schedule {
  /**
   * @param {string} name
   * @param {moment} startTime
   * @param {number} length
   * @param {array<string>} playlist
   */
  constructor(name, startTime, length, playlist) {
    this.name = name;
    this.startTime = startTime;
    this.length = length;
    this.playlist = playlist;
  }

  isActive() {
    const now = moment();
    return now.isAfter(this.startTime) && now.isBefore(this.endTime());
  }

  endTime() {
    return this.startTime.clone().add(this.length, 'h');
  }

  static fromJson(schedule) {
    return new Schedule(
      schedule.name,
      moment(schedule.start_time, SQL_FORMAT),
      schedule.length,
      schedule.playlist.split(','),
    );
  }

  static todaysSchedules() {
    return knex.select('id','name', 'length', 'start_time', 'playlist')
    .from('schedules')
    .orderBy('created_at', 'DESC')
    .limit(50)
    .then(schedules => schedules.map(Schedule.fromJson));
  }
}

module.exports = Schedule;
