import React from 'react';
import Volume from './Volume';
import styles from '../styles';
const { flex } = styles;

const Controls = props => {
  const { onPlay, onStop, onVolumeChange } = props;
  return (
    <div className={`${flex}`}>
      <button onClick={onPlay}>Play</button>
      <button onClick={onStop}>Stop</button>
      <Volume onVolumeChange={onVolumeChange} />
    </div>
  );
}

export default Controls;