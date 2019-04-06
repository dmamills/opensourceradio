import React from 'react';
import cn from 'classnames';
import { flex, p1, spaceBetween, spacedEvenly, flex1, column } from '../styles';
import AudioMetadata from './AudioMetadata';

const Library = props => {
  return (
    <div className={cn(p1)}>
      <div className={cn(flex, spaceBetween)}>
        <h2>Audio Library</h2>
      </div>
      <div className={cn(flex, spacedEvenly)}>
        <div className={cn(flex, flex1 )}>
          <h3>Browser</h3>
        </div>
        <div className={cn(flex, flex1, column)}>
          <AudioMetadata />
          <div>
            <h3>Upload Audio</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;