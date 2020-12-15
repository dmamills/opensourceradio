const moment = require('moment');
const { shuffleArray, fetchAudioDirectoryContents, timeTillNextBlockInHours } = require('../utils');
const Schedule = require('./schedule');

const defaultSchedule = async () => {
  const songs = await fetchAudioDirectoryContents()
  const startTime = moment();
  return new Schedule(
    'opensourceradio default playlist',
    startTime,
    timeTillNextBlockInHours(startTime),
    shuffleArray(songs).slice(songs.length - 2),
  );
}

const findCurrentSchedule = async () => {
  try {
    const schedules = await Schedule.todaysSchedules();
    if(!schedules || schedules.length === 0) return defaultSchedule();

    const activeSchedule = schedules.find(s => s.isActive());
    if(activeSchedule) {
      if(activeSchedule.shuffle) {
        activeSchedule.playlist = shuffleArray(activeSchedule.playlist);
      }
      
      return activeSchedule;
    }
    return defaultSchedule();
  } catch (err) {
    return defaultSchedule();
  }
}

module.exports = {
  Schedule,
  findCurrentSchedule
};
