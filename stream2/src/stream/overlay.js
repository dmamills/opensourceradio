const FONT_PATH = `${__dirname}/../font/scp.ttf`;
const FONT_SIZE = '10'
const FONT_COLOR = '#FFFFFF';
const FONT_BORDER = "#000000";
const X_POSITION = 2;

//TODO: fix sanitize text
const sanitizeText = str => {
  return str;
}

const createOverlayText = (text, x, y) => {
    return `drawtext=text='${sanitizeText(text)}'` +
      `:fontfile=${FONT_PATH}` +
      `:fontsize=(w * ${FONT_SIZE / 300})` +
      `:bordercolor=${FONT_BORDER}` +
      `:borderw=1` +
      `:fontcolor=${FONT_COLOR}` +
      `:y=(h * ${y / 100})` +
      `:x=(w * ${x / 100})`;
}

const addOverlay = metadata => {
  const { common } = metadata;
  let overlayString = '';
  const overlayTextItems = [];
  let yPosition = 5;

  overlayTextItems.push(createOverlayText('opensourceradio', X_POSITION, yPosition));
  yPosition += 10;

  if(common.artist) {
    overlayTextItems.push(createOverlayText(common.artist, X_POSITION, yPosition));
    yPosition += 10;
  }
  if(common.album) {
    overlayTextItems.push(createOverlayText(common.album, X_POSITION, yPosition));
    yPosition += 10;
  }
  
  if(common.title) {
    overlayTextItems.push(createOverlayText(common.title, X_POSITION, yPosition));
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