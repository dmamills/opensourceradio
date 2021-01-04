const { getConfig } = require('../utils');

const {
  FONT_SIZE,
  FONT_COLOR,
  FONT_BORDER,
  OVERLAY_TITLE,
  AUDIO_PATH,
} = getConfig();

const FONT_PATH = `${process.cwd()}/assets/font/scp.ttf`;
const X_POSITION = 2;

const sanitizeText = str => {
  str = str.replace(/\\/g, '\\\\');
  str = str.replace(/\:/g, '\\:');
  str = str.replace(/\'/g, '');
  return str;
}

const createOverlayText = (text, x, y) => {
    return `drawtext=text='${sanitizeText(text)}'` +
      `:fontfile=${FONT_PATH}` +
      `:fontsize=(w * ${(FONT_SIZE / 300).toFixed(2)})` +
      `:bordercolor=${FONT_BORDER}` +
      `:borderw=1` +
      `:fontcolor=${FONT_COLOR}` +
      `:y=(h * ${(y / 100).toFixed(2)})` +
      `:x=(w * ${(x / 100).toFixed(2)})`;
}

const addOverlay = (metadata, audioPath) => {
  const { common } = metadata;
  let overlayString = '';
  const overlayTextItems = [];
  let yPosition = 5;

  overlayTextItems.push(createOverlayText(OVERLAY_TITLE, X_POSITION, yPosition));
  yPosition += 8;

  if(common.artist) {
    overlayTextItems.push(createOverlayText(common.artist, X_POSITION, yPosition));
    yPosition += 8;
  }
  if(common.album) {
    overlayTextItems.push(createOverlayText(common.album, X_POSITION, yPosition));
    yPosition += 8;
  }

  if(common.title) {
    overlayTextItems.push(createOverlayText(common.title, X_POSITION, yPosition));
  }

  if(!common.artist && !common.title && !common.album) {
    const songName = audioPath.replace(AUDIO_PATH, '');
    overlayTextItems.push(createOverlayText(songName, X_POSITION, yPosition));
  }

  overlayTextItems.forEach((item, index) => {
   overlayString += `${item}`;
    if (index < overlayTextItems.length - 1) {
      overlayString += ',';
    }
  });

  return overlayString;
}

module.exports = addOverlay;
