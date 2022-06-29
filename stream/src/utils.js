const fs = require('fs');
const moment = require('moment');
const knex = require('knex')(require('../knexfile').development);

const SHORT_FORMAT = 'HH:mma';
const TIME_FORMAT = `MMM DD YYYY ${SHORT_FORMAT}`;

const getConfig = () => require('../config.json');
const { AUDIO_PATH } = getConfig();
const osrLog = msg => console.log(`[osr stream] ${msg}`);

const getNextIndex = (arr, n) => n + 1 >= arr.length ? 0 : n + 1;

const printSchedule = schedule => {
  osrLog(`Schedule: ${schedule.name} Start: ${schedule.startTime.format(SHORT_FORMAT)} End: ${schedule.endTime().format(SHORT_FORMAT)}`);
  const duration = schedule.length <= 1 ? `${Math.ceil(schedule.length * 60)} minutes` : `${schedule.length} hour${schedule.length > 1 ? 's' : ''}`;
  osrLog(`Duration: ${duration}`);
};

function shuffleArray(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

const fetchAudioDirectoryContents = () => {
  return new Promise(resolve => {
    fs.readdir(AUDIO_PATH, (err, files) => {
      if(err) { throw err; }
      resolve(files.filter(f => f.indexOf('.mp3') > -1));
    });
  });
};

const writeToSongLog = (audioPath, command, schedule) => {
  return knex('song_log').insert({
    schedule_id: schedule.id,
    schedule_start_time: schedule.startTime.toDate(),
    schedule_stop_time: schedule.endTime().toDate(),
    schedule_playlist: schedule.playlist.join(','),
    file_name: audioPath,
    ffmpeg_command: command,
    created_at: new Date(),
    updated_at: new Date(),
  });
};

//TODO: fix generation of default playlist
const timeTillNextBlockInHours = (startTime = moment()) => {
  return 0;
};

module.exports = {
  osrLog,
  printSchedule,
  getNextIndex,
  shuffleArray,
  TIME_FORMAT,
  getConfig,
  fetchAudioDirectoryContents,
  timeTillNextBlockInHours,
  writeToSongLog,
};
