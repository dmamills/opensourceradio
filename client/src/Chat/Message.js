import React, { useState } from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';

import { flex, listStyleNone, p1, whiteText, cursorPointer, mainTheme08Bg } from '../styles';
import { parseTime } from '../utils';

const [msgStyles, songLogStyles] = stylish({
  ':nth-child(odd)': {
    backgroundColor: 'rgba(211,211,211, 0.2)'
  },
  ":nth-child(even)": {
    backgroundColor: 'rgba(169,169,169, 0.2)'
  }
}, {
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

const Message = ({ message }) => {
  const [showSong, setShowSong] = useState(false)
  const [songLogPosition, setSongLogPosition] = useState({x: 0, y: 0});
  const onEnter = (e) => {
    setSongLogPosition({x: e.clientX, y: e.clientY });
    setShowSong(true);
  }
  const onLeave = () => setShowSong(false);
  const { timestamp, name, active_song } = message;
  return (
    <li
      className={cn(flex, listStyleNone, p1, msgStyles)}
      key={`${name}-${timestamp}`}
    >
      <div>

        <strong onMouseOver={onEnter} onMouseLeave={onLeave} className={cn(whiteText, cursorPointer)}>[{parseTime(timestamp)}]</strong>
        <strong className={whiteText}>{` <${name}> `}</strong>
        <span className={whiteText}>{message.message}</span>
        {showSong && <SongLogBox song={active_song} position={songLogPosition} />}
      </div>
    </li>
  );
}

export default Message;
