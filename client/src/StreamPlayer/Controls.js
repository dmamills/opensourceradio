import React from 'react';
import stylish from '@dmamills/stylish';
import cn from 'classnames';
import Volume from './Volume';
import { flex, p1, spaceBetween, alignItemsCenter, mr1 } from '../styles';

const [container, fullScreenBtn, svgIcon]  = stylish({
  backgroundColor: 'rgba(211,211,211, 0.2)'
}, {
  border: 'none',
  background: 'none',
  cursor: 'pointer',
}, {
  width: '30px',
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
      <svg className={svgIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
    </button>
  );
}

const PlaySvg = () => {
  return <svg className={svgIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
</svg>
}

const StopSvg = () => {
  return <svg className={svgIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd" />
  </svg>;
}

const Controls = ({ onPlay, onStop, onVolumeChange, onFullScreen, playing }) => {
  const button = playing ? <button className={cn(fullScreenBtn, mr1)} onClick={onStop}><StopSvg /></button>
                         : <button className={cn(fullScreenBtn, mr1)} onClick={onPlay}><PlaySvg /></button>;
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
