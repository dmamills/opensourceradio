const WIDTH = 1280;
const HEIGHT = 720;

const VIDEO_CODEC = 'libx264';
const VIDEO_BIT_RATE = '2500k';
const AUDIO_BIT_RATE = '128k';

const AUDIO_SAMPLE_RATE= '44100';
const AUDIO_CODEC = 'aac'

const NUM_THREADS = '2';
const PRESET = 'superfast';
const CRF = '28';
const BUFFER_SIZE = '2500k';
const FRAMES_PER_SECOND = '24';

const addOptions = (metadata) => {
  
  const delayInMilli = 3000;
  const delayInSeconds = Math.ceil(delayInMilli / 1000);
  const streamDuration = delayInSeconds * 2 + Math.ceil(metadata.format.duration);

  let outputOptions = [
    /* `-map [videooutput]`, */
    /* `-map [audiooutput]`, */
    // Our fps from earlier
    `-r ${FRAMES_PER_SECOND}`,
    // Group of pictures, want to set to 2 seconds
    // https://trac.ffmpeg.org/wiki/EncodingForStreamingSites
    // https://www.addictivetips.com/ubuntu-linux-tips/stream-to-twitch-command-line-linux/
    // Best Explanation: https://superuser.com/questions/908280/what-is-the-correct-way-to-fix-keyframes-in-ffmpeg-for-dash
    `-g ${parseInt(FRAMES_PER_SECOND, 10) * 2}`,
    `-keyint_min ${FRAMES_PER_SECOND}`,
    // Stop audio once we hit the specified duration
    `-t ${streamDuration}`,
    // https://trac.ffmpeg.org/wiki/EncodingForStreamingSites
    `-pix_fmt yuv420p`
  ];

  outputOptions.push(`-s ${WIDTH}x${HEIGHT}`);

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
