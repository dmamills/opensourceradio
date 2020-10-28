import flvjs from 'flv.js';

class MediaPlayer {
  constructor(streamUrl) {
    console.log('stream url', streamUrl)
    this.flvPlayer = flvjs.createPlayer({ // eslint-disable-line no-undef
      type: 'flv',
      url: streamUrl,
      isLive: true,
    });
  }

  start = () => { this.flvPlayer.start(); }
  play = () => { this.flvPlayer.play(); }
  pause = () => { this.flvPlayer.pause(); }
  unload = () => { this.flvPlayer.unload(); }
  load = () => { this.flvPlayer.load(); }
  destroy = () => { this.flvPlayer.destroy(); }
  attach = (el) => { this.flvPlayer.attachMediaElement(el); }
}

export default MediaPlayer;
