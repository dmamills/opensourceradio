import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { p1, flex, spaceBetween, m0, whiteText, link, alignSelfCenter, mr1, mainTheme, ph1 } from '../styles';
import { getSchedules } from '../api';
import Schedules from './Schedules';
import UserList from './UserList';

import stylish from '@dmamills/stylish';

const modalContainer = stylish({
  position: 'absolute',
  top: '50px',
  right: '0',
  height: '600px',
  width: '600px',
  overflowY: 'scroll',
  padding: '1rem',
});

const NewsList = () => ( <div className={cn(modalContainer, mainTheme, whiteText)}>
<div className={cn(flex, spaceBetween, ph1)}>
  <h1 className={m0}>opensourceradio news!</h1>
</div>
<div className={cn(p1)}>
  <p>hello world</p>

</div>
</div>)


const Header = ({ socket }) => {
  const [showUsers, setShowUsers] = useState(false);
  const [showSchedules, setShowSchedules] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('user-joined', onUsersChange);
    socket.on('user-left', onUsersChange);

    return function() {
      socket.off('user-joined', onUsersChange);
      socket.off('user-left', onUsersChange);
    }
  }, [socket])

  const onUsersChange = ({ users }) => setUsers(users);
  const hideUsers = () =>  setShowUsers(false);
  const hideSchedules = () => setShowSchedules(false);
  const hideNews = () => setShowNews(false);
  const unsetTabs = () => {
    setShowUsers(false);
    setShowSchedules(false);
    setShowNews(false);
  }



  const onUserlistClick = () => {
    unsetTabs()
    setShowUsers(true);
  }

  const onSchedulesClick = () => {
    unsetTabs();
    setShowSchedules(true);
    if(schedules.length === 0) {
      getSchedules().then(s => setSchedules(s));
    }
  }

  const onNewsClick = () => {
    console.log('make api request mebe');
    unsetTabs();
    setShowNews(true);
  }

  return (
    <header className={cn(flex, p1, spaceBetween)}>
      <h1 className={cn(alignSelfCenter, m0, whiteText)}>opensourceradio</h1>
      <div>
        <a
          data-testid="userlist"
          className={cn(link, mr1)}
          onClick={(showUsers ? hideUsers : onUserlistClick)}
          href="#userlist"
        >
          {showUsers ? 'Hide' : 'Show'} userlist
        </a>
        <a
          data-testid="schedules"
          className={cn(link, mr1)}
          onClick={(showSchedules ? hideSchedules : onSchedulesClick)}
          href="#schedules"
        >
          {showSchedules ? 'Hide' : 'Show'} schedule
        </a>
        <a
          data-testid="news"
          className={link}
          onClick={(showNews ? hideNews : onNewsClick)}
          href="#news"
        >
          {showNews ? 'Hide' : 'Show'} news
        </a>

      </div>
      { showSchedules && <Schedules schedules={schedules} /> }
      { showUsers && <UserList users={users} /> }
      { showNews && <NewsList news={[]} /> }
    </header>
  );
}

export default Header;
