const ffmpeg = require('fluent-ffmpeg');

const { getConfig } = require('../utils');
const addOptions = require('./options');
const addFilters = require('./filters');

const { FFMPEG_PATH, VIDEO_PATH, STREAM_URL } = getConfig();

if(FFMPEG_PATH && FFMPEG_PATH !== "") {
  console.log('Setting custom ffmpeg path: ', FFMPEG_PATH);
  ffmpeg.setFfmpegPath(FFMPEG_PATH);
}

const runStream = (audioPath, metadata) => {
  console.log(`Starting ffmpeg process.\nStreaming to ${STREAM_URL}`);

  return new Promise((resolve, reject) => {
    let command = ffmpeg();

    command = command.input(VIDEO_PATH).inputOptions([ '-stream_loop -1' ]);
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

    command = command.complexFilter(addFilters(metadata));

    command
      .on('start', commandString => {
        console.log(`Spawned ffmpeg with command: \n${commandString}`);
      })
      .on('end', () => {
        resolve();
      })
      .on('error', (err, stdout, stderr) => {
        reject(err);
      });

      command.save(STREAM_URL);
  });
};

module.exports = runStream;
