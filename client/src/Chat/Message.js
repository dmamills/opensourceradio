import React, { useState } from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';

import { flex, listStyleNone, p1, whiteText, cursorPointer } from '../styles';
import { parseTime } from '../utils';
import SongLogBox from './SongLogBox';

const msgStyles = stylish({
  ':nth-child(odd)': {
    backgroundColor: 'rgba(211,211,211, 0.2)'
  },
  ":nth-child(even)": {
    backgroundColor: 'rgba(169,169,169, 0.2)'
  }
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
