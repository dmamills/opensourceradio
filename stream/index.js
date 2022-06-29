require('dotenv').config();
const fs = require('fs');
const moment = require('moment');
const musicMetadata = require('music-metadata');

const stream = require('./src/stream');
const { findCurrentSchedule } = require('./src/schedule');
const { osrLog, TIME_FORMAT, writeToSongLog, getNextIndex, printSchedule, getConfig } = require('./src/utils');
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
};

const playSong = async () => {
  const { currentSchedule, lastSongPlayed } = appState;
  const currentAudioPath = `${AUDIO_PATH}${currentSchedule.playlist[lastSongPlayed]}`;
  osrLog(`playing song #${lastSongPlayed} ${currentAudioPath}`);

  try {
    if(!fs.existsSync(currentAudioPath)) throw new Error(`${currentAudioPath} not found`);

    const metadata = await musicMetadata.parseFile(currentAudioPath, { duration: true });
    const onCommandExecuted = async (ffmpegCommand) => {
      await writeToSongLog(currentAudioPath, ffmpegCommand, appState.currentSchedule);
    };

    return stream(currentAudioPath, metadata, onCommandExecuted);
  } catch(err) {
    onSongError(err);
  }
};

const onSongFinished = msg => {
  osrLog(`ffmpeg finished ${msg ? msg : ''}`);
  updateState(
    appState.currentSchedule,
    appState.lastSongPlayed,
    ++appState.songCount
  );
  radioInterval();
};

const onSongError = err => {
  osrLog('stream error:', err);
  process.exit(-1);
};

const onScheduleSet = async (schedule, nextSongIndex) => {
  printSchedule(schedule);
  updateState(schedule, nextSongIndex);
  try {
    const message = await playSong();
    onSongFinished(message);
  } catch(err) {
    onSongError(error)
  }

};



const radioInterval = async () => {
  const { currentSchedule, lastSongPlayed, songCount } = appState;
  const currentTime = moment().format(TIME_FORMAT);

  osrLog(`stream interval ${currentTime}`);

  if(!currentSchedule) {
    osrLog('Getting current schedule...');
    const schedule = await findCurrentSchedule();
    onScheduleSet(schedule, 0);
  } else if (currentSchedule.isActive()) {
    osrLog(`Continuing schedule, song count: ${songCount}`);
    const nextSongIndex = getNextIndex(currentSchedule.playlist, lastSongPlayed);
    onScheduleSet(currentSchedule, nextSongIndex);
  } else {
    osrLog('Searching for next schedule, calling onSongFinished');
    updateState(null, 0);
    onSongFinished();
  }
};

radioInterval();
