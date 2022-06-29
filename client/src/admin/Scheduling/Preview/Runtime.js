import React from 'react';

import { humanDurationOfPlaylist } from '../../../utils';

const Runtime = ({ playlist, isShuffle = false }) => {
  return (
    <>
      <p>Duration: <strong>{humanDurationOfPlaylist(playlist)}</strong> {isShuffle? 'shuffling' : 'playing'} </p>
      <p>Length: <strong>{playlist.length}</strong> song{playlist.length > 1 ? 's':''}</p>
    </>
  );
}

export default Runtime;
