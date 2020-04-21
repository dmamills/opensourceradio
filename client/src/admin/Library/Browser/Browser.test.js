import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import Browser from './index';

describe('File Component', () => {

  const testLibrary = {
    '/': ['blah1.mp3', 'blah2.mp3'],
    'otherdir': ['test1.mp3', 'test2.mp3']
  };

  it('renders without crashing', () => {
    const { queryByTestId, getByText } = render(<Browser library={testLibrary} />);
    expect(getByText('Audio Browser')).toBeInTheDocument();

    expect(queryByTestId('library-list').children.length).toEqual(2);
    expect(getByText('/')).toBeInTheDocument();
    expect(getByText('otherdir')).toBeInTheDocument();
  });
});
