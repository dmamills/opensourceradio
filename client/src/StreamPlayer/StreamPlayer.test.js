import React from 'react';
import { render } from '@testing-library/react';
import MediaPlayer from './MediaPlayer';
import StreamPlayer from './index';

const mockUnload = jest.fn();
const mockDestroy = jest.fn();
const mockLoad = jest.fn();
const mockPlay = jest.fn();
const mockStart = jest.fn();
const mockAttach = jest.fn();
jest.mock('./MediaPlayer', () => {
  return jest.fn().mockImplementation(() => {
    return {
      unload: mockUnload,
      destroy: mockDestroy,
      load: mockLoad,
      start: mockStart,
      play: mockPlay,
      attach: mockAttach,
    };
  });
});


beforeEach(() => {
  MediaPlayer.mockClear();
  mockUnload.mockClear();
  mockLoad.mockClear();
  mockDestroy.mockClear();
  mockPlay.mockClear();
  mockStart.mockClear();
  mockAttach.mockClear();
});

describe('StreamPlayer', () => {
  it('renders without crashing', () => {
    const component = render(<StreamPlayer />);
    expect(component).toBeTruthy();
  });


  it('should create player on mount', () => {
    render(<StreamPlayer />);
    expect(MediaPlayer).toHaveBeenCalled();
    expect(mockAttach).toHaveBeenCalled();
  });
});
