const moment = require('moment');
const { shuffleArray, fetchAudioDirectoryContents, timeTillNextBlockInHours } = require('../utils');
const Schedule = require('./schedule');

const defaultSchedule = () => {
  return fetchAudioDirectoryContents()
    .then(songs => {
      const startTime = moment();
      return new Schedule(
        'opensourceradio default playlist',
        startTime,
        timeTillNextBlockInHours(startTime),
        shuffleArray(songs),
      );
    });
}

const findCurrentSchedule = () => {
  return Schedule.todaysSchedules()
    .then(schedules => {
      if(!schedules || schedules.length === 0) {
        console.log('No Schedules Found, Returning Default...');
        return defaultSchedule();
      }

      console.log('Searching for current schedule...');
      const activeSchedule = schedules.find(s => s.isActive());
      if(activeSchedule) {
        console.log('Found next active schedule...');
        return activeSchedule;
      }

      console.log('No Active Schedules Found, Returning Default...');
      return defaultSchedule();
    });
}

module.exports = {
  Schedule,
  findCurrentSchedule
};
