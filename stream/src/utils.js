const fs = require('fs');
const moment = require('moment');
const chalk = require('chalk');
const Schedule = require('./schedule/schedule');

const TIME_FORMAT = 'MMM DD YYYY HH:mm a';

const getConfig = () => require('../config.json');
const { AUDIO_PATH } = getConfig();

const pad = n => n < 10 ? `0${n}` : n;
const getNextIndex = (n, arr) => n + 1 >= arr.length ? 0 : n + 1;

const printMetadata = metadata => {
  const { common, format } = metadata;
  const length = Math.floor(format.duration);
  const minutes = Math.floor(length / 60);
  const seconds = length % 60;

  console.log('');
  console.log(chalk.yellow(`\tArtist: ${common.artist}`));
  console.log(chalk.yellow(`\tAlbum: ${common.album}`));
  console.log(chalk.yellow(`\tTitle: ${common.title}`));
  console.log(chalk.yellow(`\tLength: ${pad(minutes)}:${pad(seconds)}`));
  console.log('');

  return metadata;
}

const printHeader = () => {
  console.log('');
  console.log(chalk.blue('\t▶️  Radio Interval'));
  const currentTime = moment().format(TIME_FORMAT);
  console.log(chalk.blue(`\tCurrent Time: ${currentTime}`));
  console.log('');
}

const printSchedule = schedule => {
  console.log('');
  console.log(chalk.yellow(`\tPlaying Schedule: ${schedule.name}`));
  console.log(chalk.yellow(`\tStart Time: ${schedule.startTime.format(TIME_FORMAT)}`));
  console.log(chalk.yellow(`\tEnd Time: ${schedule.endTime().format(TIME_FORMAT)}`));
  console.log(chalk.yellow(`\tPlaying for: ${schedule.length} hour${schedule.length > 1 ? 's' : ''}`));
  console.log('');
}

const printFfmpegHeader = command => {
  console.log(`\n${chalk.blue('Spawned ffmpeg with command:')}`);
  console.log(command);
  console.log('\n\n\n');
}

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
}

const timeTillNextBlockInHours = (startTime = moment()) => {
  const minutes = parseInt(startTime.format('m'), 10);
  return parseFloat((minutes / 60).toFixed(2));
}

module.exports = {
  printHeader,
  printMetadata,
  printSchedule,
  printFfmpegHeader,
  getNextIndex,
  shuffleArray,
  TIME_FORMAT,
  getConfig,
  fetchAudioDirectoryContents,
  timeTillNextBlockInHours
};
