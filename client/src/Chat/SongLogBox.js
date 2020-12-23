import React from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';

import { p1, whiteText, mainTheme08Bg } from '../styles';

const songLogStyles = stylish({
  position: 'fixed',
  zIndex:2,
  boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.10)',
});

const SongLogBox = ({ song, position }) => {
  return (
    <div className={cn(p1, songLogStyles, mainTheme08Bg)} style={{ top: position.y, left: position.x}}>
      <span className={whiteText}>sent while listening to: <strong>{song ? song : 'Unsure! Sorry!'}</strong></span>
    </div>
  )
}

export default SongLogBox;