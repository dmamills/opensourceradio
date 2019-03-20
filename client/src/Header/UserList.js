import React from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';

import { flex, spaceBetween } from '../styles';

const modalContainer = stylish({
  position: 'absolute',
  top: '50px',
  right: '0',
  height: '600px',
  width: '200px',
  backgroundColor: 'white',
  overflowY: 'scroll',
  padding: '1rem',
});

const UserList = ({ users }) => {
  return (
    <div className={modalContainer}>
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
