import React, { Component } from 'react';
import cn from 'classnames';
import { getSchedules } from '../api';
import { p1, flex, spaceBetween, m0, whiteText, link, alignSelfCenter, mr1 } from '../styles';
import Playlist from './Playlist';
import UserList from './UserList';

class Header extends Component {
  state = {
    showPlaylist: false,
    showUsers: false,
    users: [],
    schedules: [],
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
    const { schedules } = this.state;
    this.setState({ showPlaylist: true, showUsers: false });

    if(schedules.length === 0) {
      getSchedules()
      .then(schedules => {
        this.setState({ schedules });
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
    const { showPlaylist, showUsers, users , schedules } = this.state;
    return (
      <header className={cn(flex, p1, spaceBetween)}>
        <h1 className={cn(alignSelfCenter, m0, whiteText)}>opensourceradio</h1>
        <div>
          <a className={cn(link, mr1)} onClick={(showUsers ? this.hideUsers : this.onUserlistClick)} href="#userlist">{showUsers ? 'Hide' : 'Show'} userlist</a>
          <a className={link} onClick={(showPlaylist ? this.hidePlaylist : this.onPlaylistClick)} href="#playlist">{showPlaylist ? 'Hide' : 'Show'} scheduling</a>
        </div>
        { showPlaylist && <Playlist schedules={schedules} /> }
        { showUsers && <UserList users={users} /> }
      </header>
    )
  }
}

export default Header;
