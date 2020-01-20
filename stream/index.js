require('dotenv').config();
const fs = require('fs');
const moment = require('moment');
const musicMetadata = require('music-metadata');

const stream = require('./src/stream');
const { findCurrentSchedule } = require('./src/schedule');
const { TIME_FORMAT, getNextIndex, printSchedule, getConfig } = require('./src/utils');
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

const playSong = async () => {
  const { currentSchedule, lastSongPlayed } = appState;
  const currentAudioPath = `${AUDIO_PATH}${currentSchedule.playlist[lastSongPlayed]}`;
  console.log(`Playing song #${lastSongPlayed} ${currentAudioPath}`);

  try {
    if(!fs.existsSync(currentAudioPath)) throw new Error(`${currentAudioPath} not found`);

    const metadata = await musicMetadata.parseFile(currentAudioPath, { duration: true });
    return stream(currentAudioPath, metadata);
  } catch(err) {
    onSongError(err);
  }
}

const onSongFinished = msg => {
  console.log(`Song finished ${msg ? msg : ''}`);
  updateState(
    appState.currentSchedule,
    appState.lastSongPlayed,
    ++appState.songCount
  );
  radioInterval();
}

const onSongError = err => {
  console.log('stream error:', err);
  process.exit(-1);
}

const onScheduleSet = (schedule, nextSongIndex) => {
  printSchedule(schedule);
  updateState(schedule, nextSongIndex);
  playSong().then(onSongFinished, onSongError).catch(onSongError);
}

const radioInterval = () => {
  const { currentSchedule, lastSongPlayed, songCount } = appState;
  const currentTime = moment().format(TIME_FORMAT);
  console.log(`opensourceradio stream interval.\ncurrent time: ${currentTime}`);

  if(!currentSchedule) {
    console.log('Getting current schedule...');
    findCurrentSchedule().then(schedule => onScheduleSet(schedule, 0));
  } else if (currentSchedule.isActive()) {
    console.log(`Continuing schedule, song count: ${songCount}`);
    const nextSongIndex = getNextIndex(currentSchedule.playlist, lastSongPlayed)
    onScheduleSet(currentSchedule, nextSongIndex);
  } else {
    console.log('Searching for next schedule, calling onSongFinished');
    updateState(null, 0);
    onSongFinished();
  }
}

radioInterval();
