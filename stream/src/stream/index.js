const ffmpeg = require('fluent-ffmpeg');
const progress = require('cli-progress');
const chalk = require('chalk');
const { getVideoDurationInSeconds } = require('get-video-duration');

const { printFfmpegHeader, getConfig } = require('../utils');
const addOptions = require('./options');
const addFilters = require('./filters');

const { FFMPEG_PATH, VIDEO_PATH, STREAM_URL } = getConfig();

if(FFMPEG_PATH && FFMPEG_PATH !== "") {
  console.log(chalk.magenta('Setting custom ffmpeg path: ', FFMPEG_PATH));
  ffmpeg.setFfmpegPath(FFMPEG_PATH);
}

const makeProgressBar = () => {
  return new progress.Bar({ format: 'Episode Progress {bar} {percentage}% | Time Playing: {duration_formatted} |' }, progress.Presets.shades_classic);
};

const progressToSeconds = progress => {
  const timestamp = progress.timemark.substring(0, 8);
  const splitTimestamp = timestamp.split(':');
  return parseInt(splitTimestamp[0], 10) * 60 * 60 + parseInt(splitTimestamp[1], 10) * 60 + parseInt(splitTimestamp[2], 10);
};

const runStream = (audioPath) => {
  console.log(chalk.magenta(`Starting ffmpeg process`));
  console.log(chalk.magenta(`Streaming to: ${STREAM_URL}`));

  return getVideoDurationInSeconds(audioPath).then((duration) => {

    return new Promise((resolve, reject) => {
      let command = ffmpeg();
      command = command.input(audioPath);

      command = command
      .inputOptions([
        `-re`
      ]);

      command = command.outputOptions([
        ...addOptions({ duration }),
        `-f flv`
      ]);

      const progressBar = makeProgressBar();

      command
        .on('start', commandString => {
          printFfmpegHeader(commandString);
          progressBar.start(Math.floor(duration), 0);
        })
        .on('end', () => {
          progressBar.stop();
          resolve();
        })
        .on('error', (err, stdout, stderr) => {
          progressBar.stop();
          reject(err);
        })
        .on('progress', progress => {
          progressBar.update(progressToSeconds(progress));
        });

        command.save(STREAM_URL);
    });
  });
};

module.exports = runStream;
