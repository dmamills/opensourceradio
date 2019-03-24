const moment = require('moment');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const knex = require('knex')(require('../knexfile').development);
const { getFullPath, shuffleArray } = require('./utils');

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
    return now.isAfter(this.startTime) && now.isBefore(this.startTime.clone().add(this.length, 'h')); // now <= this.startTime + hours
  }

  static fromJson(schedule) {
    return new Schedule(
      schedule.name,
      moment(schedule.start_time, 'YYYY-MM-DD hh:mm:ss'),
      schedule.length,
      schedule.playlist.split(',').map(getFullPath),
    )
  }

  static todaysSchedules() {
    return knex.select('id','name', 'length', 'start_time', 'playlist')
    .from('schedules')
    .orderBy('created_at', 'DESC')
    .limit(50)
    .then(schedules => schedules.map(Schedule.fromJson))
  }
}

function createSchedule(name, start_time, length, playlist) {
  return knex('schedules')
    .insert({
      namename,
      start_time,
      length,
      playlist,
    });
}

const defaultSchedule = () => {
  const audioDirectory = path.resolve(__dirname, '../audio');
  return new Promise(resolve => {
    fs.readdir(audioDirectory, (err, files) => {
      if(err) {
        throw err;
      }

      resolve(new Schedule(
        'opensourceradio default playlist',
        moment(),
        0.2,
        shuffleArray(files.map(getFullPath)),
      ));
    });
  });
}

const findCurrentSchedule = () => {
  return Schedule.todaysSchedules()
    .then(schedules => {
      if(!schedules || schedules.length === 0) {
        console.log(chalk.blue('No Schedules Found, Returning Default...'));
        return defaultSchedule();
      } 

      console.log('Searching for current schedule...');
      for(let i =0; i < schedules.length; i++) {
        if(schedules[i].isActive()) {
          console.log(chalk.blue('Found next active schedule...'));
          return schedules[i];
        }
      }
      
      console.log(chalk.blue('No Active Schedules Found, Returning Default...'));
      return defaultSchedule();
    });
}

module.exports = {
  Schedule,
  createSchedule,
  findCurrentSchedule
};
