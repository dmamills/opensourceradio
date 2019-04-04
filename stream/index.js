const chalk = require('chalk');
const fs = require('fs');
const musicMetadata = require('music-metadata');

const stream = require('./src/stream');
const { findCurrentSchedule } = require('./src/schedule');
const { printMetadata, printHeader, getNextSong, printSchedule, writeAppState, loadAppState, getConfig } = require('./src/utils');

const videoPath = `${__dirname}/assets/video/dock.mp4`;
const audioPath = `${__dirname}/assets/audio/`;
const { STREAM_URL } = getConfig();

const appState = {
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
  const currentAudioPath = `${audioPath}${currentSchedule.playlist[lastSongPlayed]}`;

  console.log(chalk.magenta(`Playing song #${lastSongPlayed} ${currentAudioPath}`));

  if(!fs.existsSync(currentAudioPath)) {
    return Promise.reject(`Song at path: ${currentAudioPath} not found!`);
  }

  return musicMetadata.parseFile(currentAudioPath, { duration: true })
    .then(metadata => {
      printMetadata(metadata);
      return stream(STREAM_URL, videoPath, currentAudioPath, metadata)
    }).catch(onSongError);
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
  console.log('Quitting process...');
  process.exit(-1);

  //WRITE STATE TO FILE?
  /*
  const writeState = Object.create({}, appState);
  writeState.lastSongPlayed = getNextSong(writeState.playlist, writeState.lastSongPlayed);
  writeState.songCount++;

  writeAppState(writeState)
  .then(() => {
    process.exit(-1);
  }, err => {
    console.log(chalk.red('Failed to write app state: '), err.message);
    process.exit(-1);
  });
  */
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
    console.log(chalk.magenta('Getting initial schedule'));
    findCurrentSchedule()
      .then(schedule => {
        onScheduleSet(schedule, 0);
      });
  } else if (currentSchedule.isActive()) {
    console.log(chalk.magenta(`Continuing schedule, song count: ${songCount}`));
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

console.log(chalk.magenta(`Welcome to opensource radio. 📻`));
console.log(chalk.magenta('Starting server...'))
radioInterval();
/*
loadAppState()
  .then(state => {
    console.log(chalk.blue('Loaded app state from file.'));
    appState = state;
    radioInterval();
  }, err => {
    console.log(chalk.blue('No previous app state found'));
    radioInterval();
  });
*/