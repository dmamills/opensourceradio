import React, { Component } from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';

import { flex, spaceBetween } from '../styles';

const modalContainer = stylish({
  position: 'absolute',
  top: '50px',
  right: '0',
  height: '600px',
  width: '400px',
  backgroundColor: 'white',
  overflowY: 'scroll',
  padding: '1rem',
});

const Playlist = ({ playlist }) => {
  return (
    <div className={modalContainer}>
      <div className={cn(flex, spaceBetween)}>
        <h1>Playlist</h1>
      </div>
      <p>Stream currently randomly selecting from:</p>
      <ul>
        {playlist.map(({ artist, title }) => {
          const val = `${artist} - ${title}`;
          return <li key={val}>{val}</li>
        })}
      </ul>
    </div>
  );
}

export default Playlist;
