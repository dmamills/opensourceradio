import React, { Component } from 'react';
import cn from 'classnames';
import { getPlaylist } from '../api';
import { p1, flex, spaceBetween, m0, whiteText, link, alignSelfCenter } from '../styles';
import Playlist from './Playlist';

class Header extends Component {
  state = {
    showPlaylist: false,
    playlist: [],
  }

  onClick = () => {
    const { playlist } = this.state;
    this.setState({ showPlaylist: true });

    if(playlist.length === 0) {
      getPlaylist()
      .then(playlist => {
        this.setState({ playlist });
      });
    }
  }

  hide = () => {
    this.setState({ showPlaylist: false });
  }
  
  render() {
    const { showPlaylist, playlist } = this.state;
    return (
      <header className={cn(flex, p1, spaceBetween)}>
        <h1 className={cn(alignSelfCenter, m0, whiteText)}>opensourceradio</h1>
        <div>
          <a className={link} onClick={(showPlaylist ? this.hide : this.onClick)} href="#playlist">{showPlaylist ? 'Hide' : 'Show'} playlist here</a>
        </div>
        { showPlaylist && <Playlist playlist={playlist} /> }
      </header>
    )
  }
}

export default Header;
