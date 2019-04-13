const fs = require('fs');
const path = require('path');
const moment = require('moment');
const chalk = require('chalk');

const STATE_LOG_FILE = `${process.cwd()}/state.log`;
const TIME_FORMAT = 'MMM DD YYYY HH:mm a';

const getConfig = () => require('../config.json');
const pad = n => n < 10 ? `0${n}` : n;

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

const getNextSong = (playlist, lastSongPlayed) => {
  let n = lastSongPlayed + 1;
  if(n >= playlist.length) {
    n = 0;
  }
  return n;
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



function writeAppState(appState) {
  return new Promise((resolve, reject) => {
    fs.writeFile(STATE_LOG_FILE, JSON.stringify(appState), (err) => {
      if(err) reject(err.message);
      else resolve();
    });
  })
}

function loadAppState() {
  return new Promise((resolve, reject) => {
    fs.readFile(STATE_LOG_FILE, (err, data) => {
      if(err) { reject(err.message); }
      else {
        try {
          const state = JSON.parse(data.toString());
          resolve(state);
        } catch(e) {
          reject(e);
        }
      }
    })
  });
}

const fetchAudioDirectoryContents = () => {
  const audioDirectory = path.resolve(__dirname, '../../assets/audio');
  return new Promise(resolve => {
    fs.readdir(audioDirectory, (err, files) => {
      if(err) {
        throw err;
      } else {
        resolve(files);
      }
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
  getNextSong,
  shuffleArray,
  writeAppState,
  loadAppState,
  TIME_FORMAT,
  getConfig,
  fetchAudioDirectoryContents,
  timeTillNextBlockInHours
};
