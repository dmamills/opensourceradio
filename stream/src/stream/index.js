const ffmpeg = require('fluent-ffmpeg');
const chalk = require('chalk');

const { printFfmpegHeader, getConfig } = require('../utils');
const addOptions = require('./options');
const addFilters = require('./filters');

const { FFMPEG_PATH, VIDEO_PATH, STREAM_URL } = getConfig();

if(FFMPEG_PATH && FFMPEG_PATH !== "") {
  console.log(chalk.magenta('Setting custom ffmpeg path: ', FFMPEG_PATH));
  ffmpeg.setFfmpegPath(FFMPEG_PATH);
}

const runStream = (audioPath, metadata) => {
  console.log(chalk.magenta(`Starting ffmpeg process`));
  console.log(chalk.magenta(`Streaming to: ${STREAM_URL}`));

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
        printFfmpegHeader(commandString);
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
