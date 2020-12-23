import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { p1, flex, spaceBetween, m0, whiteText, link, alignSelfCenter, mr1 } from '../styles';
import { getSchedules } from '../api';
import Schedules from './Schedules';
import UserList from './UserList';
import NewsList from './NewsList';

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

  const headerItems = [
    {
      testid: 'userlist',
      className: cn(link, mr1),
      onClick: showUsers ? hideUsers : onUserlistClick,
      href: '#userlist',
      content: `${showUsers ? 'Hide' : 'Show'} userlist`
    },
    {
      testid: 'schedules',
      className: cn(link, mr1),
      onClick: showSchedules ? hideSchedules : onSchedulesClick,
      href: '#schedules',
      content: `${showSchedules ? 'Hide' : 'Show'} schedules`
    },
    {
      testid: 'news',
      className: cn(link, mr1),
      onClick: showNews ? hideNews : onNewsClick,
      href: '#news',
      content: `${showNews ? 'Hide' : 'Show'} news`
    },
  ]

  return (
    <header className={cn(flex, p1, spaceBetween)}>
      <h1 className={cn(alignSelfCenter, m0, whiteText)}>opensourceradio</h1>
      <div>
        {headerItems.map(({testid, className, onClick, href, content}) => {
          return (<a
            key={testid}
            data-testid={testid}
            className={className}
            onClick={onClick}
            href={href}
          >
            {content}
          </a>
        )})}
      </div>
      { showSchedules && <Schedules schedules={schedules} /> }
      { showUsers && <UserList users={users} /> }
      { showNews && <NewsList news={[]} /> }
    </header>
  );
}

export default Header;
