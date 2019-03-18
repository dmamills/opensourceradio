import React, { Component } from 'react';
import cn from 'classnames';
import { getPlaylist } from '../api';
import { p1, flex, spaceBetween, m0, whiteText, link, alignSelfCenter, mr1 } from '../styles';
import Playlist from './Playlist';
import UserList from './UserList';

class Header extends Component {
  state = {
    showPlaylist: false,
    showUsers: false,
    users: [],
    playlist: [],
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on('user-joined', this.onUsersChange);
    socket.on('user-left', this.onUsersChange);
  }

  componentWillUnmount() {
    const { socket } = this.props;
    socket.off('user-joined', this.onUsersChange);
    socket.off('user-left', this.onUsersChange);
  }

  onUsersChange = ({ users }) => {
    this.setState({
      users
    });
  }

  onPlaylistClick = () => {
    const { playlist } = this.state;
    this.setState({ showPlaylist: true, showUsers: false });

    if(playlist.length === 0) {
      getPlaylist()
      .then(playlist => {
        this.setState({ playlist });
      });
    }
  }

  onUserlistClick = () => {
    this.setState({ showUsers: true, showPlaylist: false });
  }

  hideUsers = () => {
    this.setState({ showUsers: false });
  }

  hidePlaylist = () => {
    this.setState({ showPlaylist: false });
  }
  
  render() {
    const { showPlaylist, showUsers, users , playlist } = this.state;
    return (
      <header className={cn(flex, p1, spaceBetween)}>
        <h1 className={cn(alignSelfCenter, m0, whiteText)}>opensourceradio</h1>
        <div>
          <a className={cn(link, mr1)} onClick={(showUsers ? this.hideUsers : this.onUserlistClick)} href="#userlist">{showUsers ? 'Hide' : 'Show'} userlist</a>
          <a className={link} onClick={(showPlaylist ? this.hidePlaylist : this.onPlaylistClick)} href="#playlist">{showPlaylist ? 'Hide' : 'Show'} playlist</a>
        </div>
        { showPlaylist && <Playlist playlist={playlist} /> }
        { showUsers && <UserList users={users} /> }
      </header>
    )
  }
}

export default Header;
