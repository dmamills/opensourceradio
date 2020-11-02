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
        shuffleArray(songs).slice(songs.length - 2),
      );
    });
}

const findCurrentSchedule = async () => {
  try {
    const schedules = await Schedule.todaysSchedules();
    if(!schedules || schedules.length === 0) return defaultSchedule();

    const activeSchedule = schedules.find(s => s.isActive());
    if(activeSchedule) return activeSchedule;

    return defaultSchedule();
  } catch (err) {
    return defaultSchedule();
  }
}

module.exports = {
  Schedule,
  findCurrentSchedule
};
