const knex = require('knex')(require('./knexfile').development);
const moment = require('moment');
const musicMetadata = require('music-metadata');

const ROOT_AUDIO_PATH = `${process.cwd()}/../stream/assets/audio/`;
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

function getHistory() {
  return knex.select('name', 'message', knex.raw('created_at as timestamp'))
    .from('messages')
    .orderBy('created_at', 'DESC')
    .limit(50);
}

function getMetadataForSongs(songs) {
  return Promise.all(songs.map(audioPath => {
    audioPath = `${ROOT_AUDIO_PATH}${audioPath}`;
    return musicMetadata.parseFile(audioPath, { duration: true })
    .then(metadata => {
      return {
        artist: metadata.common.artist,
        album: metadata.common.album,
        title: metadata.common.title
      };
    });
  })
  );
}

function loadMetadataforSchedules(schedules) {
  return Promise.all(
    schedules.map(schedule => {
      const playlist = schedule.playlist.split(',');
      return getMetadataForSongs(playlist).then(songs => {
        schedule.playlist = songs;
        return schedule;
      })
    })
  )
}

function getTodaysSchedules() {
  return knex.select('id', 'name', 'description', 'start_time', 'length', 'playlist')
    .from('schedules')
    .where('start_time', '>=', moment().startOf('day').format(DATE_FORMAT))
    .where('start_time', '<=', moment().endOf('day').format(DATE_FORMAT))
    //.then(loadMetadataforSchedules)
    .then(schedules => {
      return schedules.sort((s1, s2) => {
        return moment(s1.start_time, DATE_FORMAT).diff(moment(s2.start_time, DATE_FORMAT))
      });
    });
}

function getAllSchedules() {
  return knex.select('id', 'name', 'description', 'start_time', 'length', 'playlist', 'created_at', 'updated_at')
    .from('schedules')
    .then(schedules => {
      return schedules.sort((s1, s2) => {
        return moment(s1.start_time, DATE_FORMAT).diff(moment(s2.start_time, DATE_FORMAT))
      });
    });
}

function saveMessage(message) {
  return knex('messages')
    .insert({
      name: message.name,
      created_at: message.timestamp,
      message: message.message
    });
}

module.exports = {
  getHistory,
  getTodaysSchedules,
  getAllSchedules,
  saveMessage,
};
