import React, { Component } from 'react';
import stylish from '@dmamills/stylish';
import flvjs from 'flv.js';
import Controls from './Controls';
import cn from 'classnames';
import { flex, column, ml1 } from '../styles';

const STREAM_URL = process.env.REACT_APP_STREAM_URL;

const playerContainer = stylish({
  height: '400px',
});

class StreamPlayer extends Component {
  state = {
    playing: false
  }
  componentDidMount() {
    this.flvPlayer = flvjs.createPlayer({ // eslint-disable-line no-undef
      type: 'flv',
      url: STREAM_URL,
      isLive: true,
    });

    this.flvPlayer.attachMediaElement(this.videoElement);

    this.videoElement.addEventListener('ended', () => {
      this.setState({
        playing: false
      }, this.start);
    });

    this.start();
  }

  start = () => {
    const { playing } = this.state;
    if(playing) return;

    this.flvPlayer.unload();
    this.flvPlayer.load();
    this.flvPlayer.play();
    this.setState({ playing: true });
  }

  componentWillUnmount() {
    this.flvPlayer.destroy();
  }

  getVideoReference = el => {
    this.videoElement = el;
  }

  onPlay = () => {
    this.start();
  }

  onStop = () => {
    if(!this.state.playing) return;

    this.flvPlayer.pause();
    this.setState({ playing: false });
  }

  onVolumeChange = volume => {
    this.videoElement.volume = volume;
  }

  render() {
    return (
      <div className={cn(ml1, flex, column)}>
        <video
          ref={this.getVideoReference}
          className={playerContainer}
        >
        </video>
        <Controls
          playing={this.state.playing}
          onPlay={this.onPlay}
          onStop={this.onStop}
          onVolumeChange={this.onVolumeChange}
        />
      </div>
    );
  }
}

export default StreamPlayer;