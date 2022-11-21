const fs = require('fs/promises');
const ffmpeg = require('fluent-ffmpeg');

const { getConfig, osrLog } = require('../utils');
const addOptions = require('./options');
const addFilters = require('./filters');

const { FFMPEG_PATH, VIDEO_PATH, STREAM_URL } = getConfig();

if(FFMPEG_PATH && FFMPEG_PATH !== "") {
  osrLog('Setting ffmpeg Path: ', FFMPEG_PATH);
  ffmpeg.setFfmpegPath(FFMPEG_PATH);
}

let videoFiles = null;

const getRandomVideoFilePath = async () => {
  if(!videoFiles) {
    const files = await fs.readdir(VIDEO_PATH);
    videoFiles = files.filter((name) => name.endsWith('.mp4'));
  }

  return `${VIDEO_PATH}${videoFiles[Math.floor(Math.random() * videoFiles.length)]}`;
}

const runStream = async (audioPath, metadata, commandFn) => {
  osrLog(`ffmpeg process start: ${STREAM_URL}`);

  return new Promise(async (resolve, reject) => {
    let command = ffmpeg();

    const videoFilePath = await getRandomVideoFilePath();
    console.log('Starting stream with video file:', videoFilePath);
    command = command.input(videoFilePath).inputOptions([ '-stream_loop -1' ]);
    command = command.input(audioPath).audioCodec('copy');

    command = command
    .input('anullsrc')
    .audioCodec('copy')
    .inputOptions([
      `-f lavfi`,
      `-re`
    ]);

    command = command.outputOptions([
      ...addOptions(metadata),
      `-f flv`
    ]);

    command = command.complexFilter(addFilters(metadata, audioPath));

    command
      .on('start', commandFn)
      .on('end', resolve)
      .on('error', reject);

      command.save(STREAM_URL);
  });
};

module.exports = runStream;
