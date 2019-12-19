import React from 'react';
import { render, act } from '@testing-library/react';
import Chat from './index';

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
  it('renders without crashing', async () => {
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

    await act(async () => {
      await render(<Chat socket={socket} />);
    });

    expect(onSpy).toBeCalledTimes(2);
    expect(emitSpy).toBeCalledTimes(1);
    expect(onceSpy).toBeCalledTimes(1);
  });
});
