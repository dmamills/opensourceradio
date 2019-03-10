import React from 'react';
import stylish from '@dmamills/stylish';
import cn from 'classnames';
import Volume from './Volume';
import { flex, p1 } from '../styles';

const btn = stylish({
  backgroundColor: 'blue',
  border: '0',
  margin: '0.5rem',
  padding: '0 2rem',
  borderRadius: '0.5rem',
  color: '#FFF',
  fontSize: '1.3rem',
  transition: 'color 0.5s ease-in',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: 'red'
  }
});

const Controls = props => {
  const { onPlay, onStop, onVolumeChange } = props;
  return (
    <div className={cn(flex, p1)}>
      <button className={btn} onClick={onPlay}>▶</button>
      <button className={btn} onClick={onStop}>■</button>
      <Volume onVolumeChange={onVolumeChange} />
    </div>
  );
}

export default Controls;
