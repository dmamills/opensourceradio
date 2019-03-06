import React, { Component } from 'react';
import styles from '../styles';
const { flexGrow, p1 } = styles;

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
      <div className={`${flexGrow} ${p1}`}>
        <label htmlFor="volume">Volume</label>
        <input 
          type="range"
          name="volume"
          min="0" 
          max="1"
          step="0.1"
          value={volume}
          onChange={this.onChange}
        />
      </div>
    );
  } 
}

export default Volume;