import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import Chat from './index';
import api from '../api';

jest.mock('socket.io-client');
jest.mock('../api', () => {
    return {
      getName: () => 'hey',
      getHistory: () => Promise.resolve([]),
    };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Chat Component', () => {
  xit('renders without crashing', () => {
    const onSpy = jest.fn();
    const offSpy = jest.fn();
    const emitSpy = jest.fn();
    const onceSpy = jest.fn();
    const socket = {
      on: onSpy,
      off: offSpy,
      emit: emitSpy,
      once: onceSpy,
    };

    //TODO: fix act error, caused by getHistory
    wait(() => {
      render(<Chat socket={socket} />);
    });
    expect(onSpy).toBeCalledTimes(2);
  });
});
