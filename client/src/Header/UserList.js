import React from 'react';
import cn from 'classnames';

import { flex, spaceBetween, mainTheme08, whiteText, modalContainer } from '../styles';

const UserList = ({ users }) => {
  return (
    <div className={cn(modalContainer, mainTheme08, whiteText)}>
      <div className={cn(flex, spaceBetween)}>
        <h1>Users</h1>
      </div>
      <p>{users.length} active users:</p>
      <ul>
        {users.map(name => <li key={name}>{name}</li>)}
      </ul>
    </div>
  );
}

export default UserList;
