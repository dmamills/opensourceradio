import React from 'react';
import cn from 'classnames';
import { flex, spaceBetween, pv2, alignItemsCenter, p05, heavyText, flex2, ml1, justifyEnd, m05 } from '../styles';

const AudioMetadata = () => {
  return (
    <div className={pv2}>
      <h3>Audio Metadata</h3>
      <div>
        <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
          <label className={heavyText} htmlFor="artist">Artist</label>
          <input className={cn(flex2, ml1)} type="text" disabled />
        </div>
        <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
          <label className={heavyText} htmlFor="artist">Album</label>
          <input className={cn(flex2, ml1)} type="text" disabled />
        </div>
        <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
          <label className={heavyText} htmlFor="artist">Title</label>
          <input className={cn(flex2, ml1)} type="text" disabled />
        </div>
        <div className={cn(flex, justifyEnd, m05)}>
          <button>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default AudioMetadata;