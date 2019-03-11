import React from 'react';
import stylish from '@dmamills/stylish';
import cn from 'classnames';
import Volume from './Volume';
import { flex, p1 } from '../styles';

const btn = stylish({
  backgroundColor: 'rgba(0,0,0,0)',
  border:'0',
  margin: '0.5rem',
  padding: '0 2rem',
  borderRadius: '0.5rem',
  color: '#FFF',
  fontSize: '2.5rem',
  transition: 'color 0.6s',
  cursor: 'pointer',
  ':hover': {
    color: '#C8C8C8'
  }
});

const Controls = props => {
  const { onPlay, onStop, onVolumeChange, playing } = props;
  const button = playing ?
   <button className={btn} onClick={onStop}>■</button> :
   <button className={btn} onClick={onPlay}>▶</button>;

  return (
    <div className={cn(flex, p1)}>
      {button}   
      <Volume onVolumeChange={onVolumeChange} />
    </div>
  );
}

export default Controls;
