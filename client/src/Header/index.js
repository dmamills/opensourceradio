import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { getSchedules } from '../api';
import { p1, flex, spaceBetween, m0, whiteText, link, alignSelfCenter, mr1 } from '../styles';
import Schedules from './Schedules';
import UserList from './UserList';

const Header = ({ socket }) => {
  const [showUsers, setShowUsers ] = useState(false);
  const [showSchedules, setShowSchedules ] = useState(false);
  const [schedules, setSchedules ] = useState([]);
  const [users, setUsers ] = useState([]);

  const onUsersChange = ({ users }) => setUsers(users);
  const hideUsers = () =>  setShowUsers(false);
  const hideSchedules = () => setShowSchedules(false);

  const onUserlistClick = () => {
    setShowUsers(true);
    setShowSchedules(false);
  }

  const onSchedulesClick = () => {
    setShowUsers(false);
    setShowSchedules(true);
    if(schedules.length === 0) {
      getSchedules().then(schedules => setSchedules(schedules));
    }
  }

  useEffect(() => {
    socket.on('user-joined', onUsersChange);
    socket.on('user-left', onUsersChange);

    return function() {
      socket.off('user-joined', onUsersChange);
      socket.off('user-left', onUsersChange);
    }
  })

  return (
    <header className={cn(flex, p1, spaceBetween)}>
      <h1 className={cn(alignSelfCenter, m0, whiteText)}>opensourceradio</h1>
      <div>
        <a
          className={cn(link, mr1)}
          onClick={(showUsers ? hideUsers : onUserlistClick)}
          href="#userlist"
        >
          {showUsers ? 'Hide' : 'Show'} userlist
        </a>
        <a
          className={link}
          onClick={(showSchedules ? hideSchedules : onSchedulesClick)}
          href="#schedules"
        >
          {showSchedules ? 'Hide' : 'Show'} schedule
        </a>
      </div>
      { showSchedules && <Schedules schedules={schedules} /> }
      { showUsers && <UserList users={users} /> }
    </header>
  );
}

export default Header;
