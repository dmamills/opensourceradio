const fs = require('fs');
const moment = require('moment');
const knex = require('knex')(require('../knexfile').development);

const TIME_FORMAT = 'MMM DD YYYY HH:mma';

const getConfig = () => require('../config.json');
const { AUDIO_PATH } = getConfig();

const pad = n => n < 10 ? `0${n}` : n;
const getNextIndex = (arr, n) => n + 1 >= arr.length ? 0 : n + 1;

const printMetadata = metadata => {
  const { common, format } = metadata;
  const length = Math.floor(format.duration);
  const minutes = Math.floor(length / 60);
  const seconds = length % 60;

  console.log(`\n\tArtist: ${common.artist}`);
  console.log(`\tAlbum: ${common.album}`);
  console.log(`\tTitle: ${common.title}`);
  console.log(`\tLength: ${pad(minutes)}:${pad(seconds)}\n`);

  return metadata;
};

const printSchedule = schedule => {
  console.log(`\n\tPlaying Schedule: ${schedule.name}`);
  console.log(`\tStart Time: ${schedule.startTime.format(TIME_FORMAT)}`);
  console.log(`\tEnd Time: ${schedule.endTime().format(TIME_FORMAT)}`);
  if(schedule.length <= 1) {
    console.log(`\tPlaying for: ${Math.ceil(schedule.length * 60)} minutes`);
  } else {
    console.log(`\tPlaying for: ${schedule.length} hour${schedule.length > 1 ? 's' : ''}`);
  }
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
  printMetadata,
  printSchedule,
  getNextIndex,
  shuffleArray,
  TIME_FORMAT,
  getConfig,
  fetchAudioDirectoryContents,
  timeTillNextBlockInHours,
  writeToSongLog,
};
