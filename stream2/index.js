const chalk = require('chalk');
const fs = require('fs');
const musicMetadata = require('music-metadata');

const stream = require('./src/stream');
const { findCurrentSchedule } = require('./src/schedule');
const { printMetadata, printHeader, getNextSong, printSchedule } = require('./src/utils');
const videoPath = `${__dirname}/video/dock.mp4`;
const STREAM_URL = 'rtmp://localhost/live/opensourceradio';

const appState = {
  currentSchedule: null,
  lastSongPlayed: null
};

const updateState = (currentSchedule, lastSongPlayed) => {
  appState.currentSchedule = currentSchedule;
  appState.lastSongPlayed = lastSongPlayed;
}

const playSong = () => {
  const { currentSchedule, lastSongPlayed } = appState;
  const audioPath = currentSchedule.playlist[lastSongPlayed];

  console.log(chalk.magenta(`Playing song #${lastSongPlayed} ${audioPath}`));

  if(!fs.existsSync(audioPath)) {
    return Promise.reject(`Song at path: ${audioPath} not found!`);
  }

  return musicMetadata.parseFile(audioPath, { duration: true })
    .then(metadata => {
      printMetadata(metadata);
      return stream(STREAM_URL, videoPath, audioPath, metadata)
    });
}

const onSongFinished = msg => {
  console.log(chalk.magenta(`Song finished ${msg ? msg : ''}`));
  radioInterval();
}

const onSongError = err => {
  console.log(chalk.red('ffmpeg stream error:'), err);
  process.exit(-1);
}

const onScheduleSet = (schedule, nextSongIndex) => {
  printSchedule(schedule);
  updateState(
    schedule,
    nextSongIndex
  );
  playSong().then(onSongFinished, onSongError);
}

const radioInterval = () => {
  printHeader();
  const { currentSchedule, lastSongPlayed } = appState;
  
  if(!currentSchedule) {
    console.log(chalk.magenta('Getting initial schedule'));
    findCurrentSchedule()
      .then(schedule => {
        onScheduleSet(schedule, 0);
      });
  } else if (currentSchedule.isActive()) {
    console.log(chalk.magenta(`Continuing schedule`));
    onScheduleSet(
      currentSchedule,
      getNextSong(currentSchedule.playlist, lastSongPlayed)
    );
  } else {
    console.log('Searching for next schedule');
    updateState(null, 0);
    onSongFinished();
  }
}

const radio = () => {
  console.log(chalk.magenta(`Welcome to opensource radio. 📻`));
  console.log(chalk.magenta('Starting server...'))
  radioInterval();
}

radio();
