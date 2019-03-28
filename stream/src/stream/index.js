const ffmpeg = require('fluent-ffmpeg');
const progress = require('cli-progress');
const chalk = require('chalk');

const { printFfmpegHeader } = require('../utils');
const addOptions = require('./options');
const addFilters = require('./filters');

const makeProgressBar = () => {
  return new progress.Bar({ format: 'Audio Progress {bar} {percentage}% | Time Playing: {duration_formatted} |' }, progress.Presets.shades_classic);
}

const progressToSeconds = progress => {
  const timestamp = progress.timemark.substring(0, 8);
  const splitTimestamp = timestamp.split(':');
  return parseInt(splitTimestamp[0], 10) * 60 * 60 + parseInt(splitTimestamp[1], 10) * 60 + parseInt(splitTimestamp[2], 10);
}

const runStream = (outputPath, videoPath, audioPath, metadata) => {
  console.log(chalk.magenta(`Starting ffmpeg process`));
  console.log(chalk.magenta(`Streaming to: ${outputPath}`));

  return new Promise((resolve, reject) => {
    let command = ffmpeg();
    
    command = command.input(videoPath).inputOptions([ '-stream_loop -1' ]);
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
    const progressBar = makeProgressBar();
    
    command
      .on('start', commandString => {
        printFfmpegHeader(commandString);
        progressBar.start(Math.floor(metadata.format.duration), 0);        
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

      command.save(outputPath);
  });
}

module.exports = runStream;
