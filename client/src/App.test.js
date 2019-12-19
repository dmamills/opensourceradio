import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./StreamPlayer/MediaPlayer', () => {
  const noop = () => {};
  return jest.fn().mockImplementation(() => {
    return {
      unload: noop,
      destroy: noop,
      load: noop,
      start: noop,
      play: noop,
      attach: noop,
    }
  });
});

describe('opensourceradio client', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('opensourceradio')).toBeInTheDocument();
  });
});
