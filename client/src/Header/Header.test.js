import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from './index';

describe('Header Component', () => {
  it('mount and join websocket channels`', () => {
    const onSpy = jest.fn();
    const socket = {
      on: onSpy,
      off: () => {},
    };

    const { getByText } = render(<Header socket={socket} />);
    expect(onSpy).toBeCalledTimes(2);
    expect(getByText('opensourceradio')).toBeInTheDocument();
    expect(getByText('Show userlist')).toBeInTheDocument();
    expect(getByText('Show schedule')).toBeInTheDocument();
  });

  it('should disconnect from websocket channels on unmount', () => {
      const onSpy = jest.fn();
      const offSpy = jest.fn();
      const socket = {
          on: onSpy,
          off: offSpy,
      };

      const { unmount } = render(<Header socket={socket} />);
      unmount();
      expect(offSpy).toBeCalledTimes(2);
  });

  it('should trigger userlist when show link clicked', () => {
    const socket = {
        on: () => {},
        off: () => {},
    };

    const { queryByTestId, queryByText } = render(<Header socket={socket} />);
    fireEvent.click(queryByTestId('userlist'));
    expect(queryByText('0 active users:')).toBeInTheDocument();
  });

  it('should trigger userlist when show link clicked', () => {
      const socket = {
          on: () => {},
          off: () => {},
      };

      const { queryByTestId, queryByText } = render(<Header socket={socket} />);
      fireEvent.click(queryByTestId('schedules'));
      expect(queryByText("Today's Schedule")).toBeInTheDocument();
  });
});
