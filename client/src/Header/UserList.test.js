import React from 'react';
import { render } from '@testing-library/react';
import UserList from './UserList';

describe('UserList Component', () => {
  it('renders supplied users', () => {
    const users = ['user_one', 'user_two', 'user_three'];
    const { getByText } = render(<UserList users={users}/>);
    expect(getByText('3 active users:')).toBeInTheDocument();

    users.forEach(user => {
      expect(getByText(user)).toBeInTheDocument();
    });
  });
});
