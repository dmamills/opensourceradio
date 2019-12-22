import React from 'react';
import { render } from '@testing-library/react';
import ClientApp from './ClientApp';

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
    };
  });
});

describe('opensourceradio client', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<ClientApp />);
    expect(getByText('opensourceradio')).toBeInTheDocument();
  });
});
