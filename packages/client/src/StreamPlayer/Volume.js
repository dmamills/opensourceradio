import React, { Component } from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import { flex, p1, alignItemsCenter, whiteText, mr1, ml1 } from '../styles';

const volumeLabel = stylish({
  width: '75px',
  textAlign: 'center'
})

class Volume extends Component {
  state = {
    volume: 1
  }

  onChange = (e) => {
    const volume = e.target.value;
    this.setState({ volume });
    this.props.onVolumeChange(volume);
  }

  render() {
    const { volume } = this.state;

    return (
      <div className={cn(flex, p1, alignItemsCenter, whiteText)}>
        <label className={mr1} htmlFor="volume">Volume</label>
        <input
          type="range"
          name="volume"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={this.onChange}
        />
        <span className={volumeLabel}>{`${parseInt(volume * 100, 10)}%`}</span>
      </div>
    );
  }
}

export default Volume;