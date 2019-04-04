const moment = require('moment');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { shuffleArray } = require('../utils');
const Schedule = require('./schedule');

const defaultSchedule = () => {
  const audioDirectory = path.resolve(__dirname, '../../assets/audio');
  return new Promise(resolve => {
    fs.readdir(audioDirectory, (err, files) => {
      if(err) {
        throw err;
      }

      resolve(new Schedule(
        'opensourceradio default playlist',
        moment(),
        1,
        shuffleArray(files),
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
  findCurrentSchedule
};
