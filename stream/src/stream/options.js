const { getConfig } = require('../utils');

const {
  VIDEO_WIDTH,
  VIDEO_HEIGHT,
  VIDEO_CODEC,
  VIDEO_BIT_RATE,

  AUDIO_BIT_RATE,
  AUDIO_SAMPLE_RATE,
  AUDIO_CODEC,

  NUM_THREADS,
  PRESET,
  CRF,
  BUFFER_SIZE,
  FRAMES_PER_SECOND
} = getConfig();

const addOptions = (metadata) => {
  
  const delayInMilli = 3000;
  const delayInSeconds = Math.ceil(delayInMilli / 1000);
  const streamDuration = delayInSeconds * 2 + Math.ceil(metadata.format.duration);

  let outputOptions = [
     `-map [videooutput]`,
     `-map [audiooutput]`,
    `-r ${FRAMES_PER_SECOND}`,
    `-g ${parseInt(FRAMES_PER_SECOND, 10) * 2}`,
    `-keyint_min ${FRAMES_PER_SECOND}`,
    `-t ${streamDuration}`,
    `-pix_fmt yuv420p`
  ];

  outputOptions.push(`-s ${VIDEO_WIDTH}x${VIDEO_HEIGHT}`);

  outputOptions.push(`-b:v ${VIDEO_BIT_RATE}`);
  outputOptions.push(`-minrate ${VIDEO_BIT_RATE}`);
  outputOptions.push(`-maxrate ${VIDEO_BIT_RATE}`);

  outputOptions.push(`-b:a ${AUDIO_BIT_RATE}`);
  outputOptions.push(`-ar ${AUDIO_SAMPLE_RATE}`);
  outputOptions.push(`-acodec ${AUDIO_CODEC}`);

  outputOptions.push(`-vcodec ${VIDEO_CODEC}`);
  outputOptions.push(`-preset ${PRESET}`);
  outputOptions.push(`-bufsize ${BUFFER_SIZE}`);
  outputOptions.push(`-crf ${CRF}`);
  outputOptions.push(`-threads ${NUM_THREADS}`);

  return outputOptions;
}

module.exports = addOptions;
