import React, { useState } from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import { flex, p1, alignItemsCenter, whiteText, mr1 } from '../styles';

const volumeLabel = stylish({
  width: '75px',
  textAlign: 'center'
});

const Volume = ({ onVolumeChange }) => {
  const [volume, setVolume ] = useState(1);
  const onChange = (e) => {
      setVolume(e.target.value);
      onVolumeChange(e.target.value);
  }

  const volumeValue = parseInt(volume * 100, 10);
  return (
    <div className={cn(flex, p1, alignItemsCenter, whiteText)}>
      <label className={mr1} htmlFor="volume">Volume</label>
      <input
        data-testid="volumeControl"
        type="range"
        name="volume"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onInput={onChange}
      />
      <span className={volumeLabel}>{volumeValue}%</span>
    </div>
  );
};

export default Volume;
