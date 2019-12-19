import React from 'react';
import stylish from '@dmamills/stylish';
import cn from 'classnames';
import Volume from './Volume';
import { flex, p1, spaceBetween, alignItemsCenter } from '../styles';

const [btn, container, fullScreenBtn, svgIcon]  = stylish({
  backgroundColor: 'rgba(0,0,0,0)',
  border:'0',
  minHeight: '40px',
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
}, {
  backgroundColor: 'rgba(211,211,211, 0.2)'
}, {
  border: 'none',
  background: 'none',
  cursor: 'pointer',
}, {
  transition: 'all 0.6s',
  stroke: 'white',
  fill: 'white',
  ':hover': {
    stroke: '#C8C8C8',
    fill: '#C8C8C8',
  }
});

const FullScreenButton = ({ onFullScreen }) => {
  return (
    <button className={fullScreenBtn} onClick={onFullScreen}>
      <svg className={svgIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M24 9h-4v-5h-5v-4h9v9zm-9 15v-4h5v-5h4v9h-9zm-15-9h4v5h5v4h-9v-9zm9-15v4h-5v5h-4v-9h9z"/>
      </svg>
    </button>
  );
}

const Controls = ({ onPlay, onStop, onVolumeChange, onFullScreen, playing }) => {
  const button = playing ? <button className={btn} onClick={onStop}>■</button>
                         : <button className={btn} onClick={onPlay}>▶</button>;
  return (
    <div className={cn(flex, p1, spaceBetween, container)}>
      <div className={cn(flex, alignItemsCenter)}>
        {button}
        <FullScreenButton onFullScreen={onFullScreen} />
      </div>
      <Volume onVolumeChange={onVolumeChange} />
    </div>
  );
}

export default Controls;
