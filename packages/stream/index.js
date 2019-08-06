require('dotenv').config();
const chalk = require('chalk');
const fs = require('fs');
const musicMetadata = require('music-metadata');

const stream = require('./src/stream');
const { findCurrentSchedule } = require('./src/schedule');
const { printMetadata, printHeader, getNextIndex, printSchedule, getConfig } = require('./src/utils');
const { AUDIO_PATH } = getConfig();

let appState = {
  currentSchedule: null,
  lastSongPlayed: null,
  songCount: 0
};

const updateState = (currentSchedule, lastSongPlayed, songCount) => {
  appState.currentSchedule = currentSchedule;
  appState.lastSongPlayed = lastSongPlayed;
  appState.songCount = songCount || appState.songCount;
}

const playSong = () => {
  const { currentSchedule, lastSongPlayed } = appState;
  const currentAudioPath = `${AUDIO_PATH}${currentSchedule.playlist[lastSongPlayed]}`;

  console.log(chalk.magenta(`Playing song #${lastSongPlayed} ${currentAudioPath}`));

  if(!fs.existsSync(currentAudioPath)) {
    return Promise.reject(`Song at path: ${currentAudioPath} not found!`);
  }

  return musicMetadata.parseFile(currentAudioPath, { duration: true })
    .then(printMetadata)
    .then(metadata => stream(currentAudioPath, metadata))
    .catch(onSongError);
}

const onSongFinished = msg => {
  console.log(chalk.magenta(`Song finished ${msg ? msg : ''}`));
  updateState(
    appState.currentSchedule,
    appState.lastSongPlayed,
    ++appState.songCount
  );
  radioInterval();
}

const onSongError = err => {
  console.log(chalk.red('ffmpeg stream error:'), err);
  console.log(chalk.red('Exiting process..'));
  process.exit(-1);
}

const onScheduleSet = (schedule, nextSongIndex) => {
  printSchedule(schedule);
  updateState(
    schedule,
    nextSongIndex
  );
  playSong().then(onSongFinished, onSongError).catch(onSongError);
}

const radioInterval = () => {
  printHeader();
  const { currentSchedule, lastSongPlayed, songCount } = appState;
  
  if(!currentSchedule) {
    console.log(chalk.magenta('Getting current schedule...'));
    findCurrentSchedule()
      .then(schedule => {
        onScheduleSet(schedule, 0);
      });
  } else if (currentSchedule.isActive()) {
    console.log(chalk.magenta(`Continuing schedule, song count: ${songCount}`));
    onScheduleSet(
      currentSchedule,
      getNextIndex(currentSchedule.playlist, lastSongPlayed)
    );
  } else {
    console.log('Searching for next schedule, calling onSongFinished');
    updateState(null, 0);
    onSongFinished();
  }
}

console.log(chalk.magenta(`Welcome to opensource radio. 📻`));
console.log(chalk.magenta('Starting server...'));

radioInterval();