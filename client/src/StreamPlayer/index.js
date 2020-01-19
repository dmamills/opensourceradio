import React, { useCallback, useState, useEffect, useRef } from 'react';
import stylish from '@dmamills/stylish';
import cn from 'classnames';

import Controls from './Controls';
import MediaPlayer from './MediaPlayer';
import { flex, column, ml1 } from '../styles';

const STREAM_URL = process.env.REACT_APP_STREAM_URL;
const playerContainer = stylish({ height: '400px' });

const StreamPlayer = () => {
  const [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(false);
  const videoEl = useRef(null);

  const onStart = useCallback(() => {
    if(playing) return;

    player.unload();
    player.load();
    player.play();
    setPlaying(true);
  }, [player]);

  const onStop = () => {
    if(!playing) return;

    player.pause();
    setPlaying(false);
  }

  const onVolumeChange = volume => {
    videoEl.current.volume = volume;
  }

  const onFullScreen = () => videoEl.current.requestFullscreen()

  useEffect(() => {
    const mediaPlayer = new MediaPlayer(STREAM_URL);
    mediaPlayer.attach(videoEl.current);
    setPlayer(mediaPlayer);

    videoEl.current.addEventListener('ended', function() {
        mediaPlayer.unload();
        mediaPlayer.load();
        mediaPlayer.play();
        setPlaying(true);
    });

    return function() {
      mediaPlayer.destroy();
    }
  }, [STREAM_URL]);

  return (
    <div className={cn(ml1, flex, column)}>
      <video
        ref={videoEl}
        className={playerContainer}
      >
      </video>
      <Controls
        playing={playing}
        onPlay={onStart}
        onStop={onStop}
        onVolumeChange={onVolumeChange}
        onFullScreen={onFullScreen}
      />
    </div>
  );
}

export default StreamPlayer;
