import React, { useState } from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';

import { flex, listStyleNone, p1, whiteText, cursorPointer } from '../styles';
import { parseTime } from '../utils';
import SongLogBox from './SongLogBox';

const msgStyles = stylish({
  position: 'fixed',
  zIndex:2,
  boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.10)',
});

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
      <div className={cursorPointer} onMouseOver={onEnter} onMouseLeave={onLeave}>
        <strong className={cn(whiteText)}>[{parseTime(timestamp)}]</strong>
        <strong className={whiteText}>{` <${name}> `}</strong>
        <span className={whiteText}>{message.message}</span>
        {showSong && <SongLogBox song={active_song} position={songLogPosition} />}
      </div>
    </li>
  );
}

export default Message;
