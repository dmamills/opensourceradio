import React, { Component } from 'react';
import stylish from '@dmamills/stylish';
import flvjs from 'flv.js';
import Controls from './Controls';
import cn from 'classnames';
import styles from '../styles';

const { flexCenter, flexGrow, flex, column, alignItemsCenter } = styles;
const STREAM_URL = 'http://localhost:8000/live/example.flv';

const playerContainer = stylish({
  height: '400px',
});

class StreamPlayer extends Component {
  componentDidMount() {
    this.flvPlayer = flvjs.createPlayer({ // eslint-disable-line no-undef
      type: 'flv',
      url: STREAM_URL,
      isLive: true,
    });

    this.flvPlayer.attachMediaElement(this.videoElement);

    this.videoElement.addEventListener('ended', () => {
      console.log('[StreamPlayer] reloading.');
      setTimeout(this.start, 1);
    });

    this.start();
  }

  start = () => {
    console.log('[StreamPlayer] start');
    this.flvPlayer.unload();
    this.flvPlayer.load();
    this.flvPlayer.play();
  }

  componentWillUnmount() {
    this.flvPlayer.destroy();
  }

  getVideoReference = (el) => {
    this.videoElement = el;
  }

  onPlay = () => {
    this.flvPlayer.play();
  }

  onStop = () => {
    this.flvPlayer.pause();
  }

  onVolumeChange = (volume) => {
    this.videoElement.volume = volume;
  }

  render() {
    return <div className={cn(flex, flexCenter, flexGrow, column)}>
      <div className={cn(flex, alignItemsCenter)}>
        <video
          ref={this.getVideoReference}
          className={playerContainer}
        >
        </video>
      </div>
      <Controls
        onPlay={this.onPlay}
        onStop={this.onStop}
        onVolumeChange={this.onVolumeChange}
      />
    </div>
  }
}

export default StreamPlayer;