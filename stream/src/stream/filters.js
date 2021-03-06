const overlayText = require('./overlay');

const FRAMES_PER_SECOND = '24';
const DELAY_IN_MILLI = 3000;

const addFilters = (metadata, audioPath) => {

  let complexFilterString = '';
  complexFilterString += `[1:a] adelay=${DELAY_IN_MILLI}|${DELAY_IN_MILLI} [delayedaudio]; `;
  complexFilterString += `[delayedaudio][2:a] amix=inputs=2:duration=first:dropout_transition=3 [audiooutput]; `;
  complexFilterString += `[audiooutput] loudnorm [audiooutput]; `;
  complexFilterString += `[0:v] fps=fps=${FRAMES_PER_SECOND}`;

  //const overlayTextFilterString = "";
  const overlayTextFilterString = overlayText(metadata, audioPath);
  if (overlayTextFilterString) {
    if (complexFilterString.length > 0) {
      complexFilterString += `, `;
    }
    complexFilterString += `${overlayTextFilterString}`;
  }

  complexFilterString += ` [videooutput]`;

  return complexFilterString;
}

module.exports = addFilters;
