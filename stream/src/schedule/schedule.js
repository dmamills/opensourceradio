const moment = require('moment');
const knex = require('knex')(require('../../knexfile').development);
const SQL_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const sortByDate = (s1, s2) => moment(s1.start_time, SQL_FORMAT).diff(moment(s2.start_time, SQL_FORMAT));

class Schedule {
  /**
   * @param {string} name
   * @param {moment} startTime
   * @param {number} length
   * @param {array<string>} playlist
   */
  constructor(name, startTime, length, playlist, id = 'generated_schedule') {
    this.id = id;
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
      schedule.id
    );
  }

  static todaysSchedules() {
    const currentDOW = moment().format('dddd');
    return knex(['id','name', 'length', 'start_time', 'playlist'])
    .from('schedules')
    .where('deleted_at', null)
    .then(schedules => {
      return schedules.filter(schedule => {
        const sDOW = moment(schedule.start_time, SQL_FORMAT).format('dddd');
        return sDOW === currentDOW;
      })
    })
    .then(schedules => {
      return schedules.map(s => {
        const startTime = moment(s.start_time, SQL_FORMAT);
        return {
          ...s,
          start_time: moment().minutes(startTime.minutes()).hours(startTime.hours()).format(SQL_FORMAT)
        }
      });
    })
    .then(schedules => schedules.sort(sortByDate))
    .then(schedules => schedules.map(Schedule.fromJson));
  }
}

module.exports = Schedule;
