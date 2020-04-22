import React from 'react';
import stylish from '@dmamills/stylish';
import { fireEvent, render } from '@testing-library/react';
import File from './File';

const testFile = {
  file: "blah.mp3"
};

describe('File Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<File file={testFile} />);
    expect(getByText('blah.mp3')).toBeInTheDocument();
  });

  it('should call selectFile when clicked', () => {
    const spyFn = jest.fn();
    const { queryByTestId } = render(<File file={testFile} selectFile={spyFn} />);

    fireEvent.click(queryByTestId('file-select'));
    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledWith(testFile);
  });

  it('should change styles if song is currently selected', () => {
    const { rerender, queryByTestId } = render(<File file={testFile} selectedFile={testFile} />);

    const bgClassName = stylish({ backgroundColor: '#bac6d3' });
    expect(queryByTestId('file-select')).toHaveClass(bgClassName);


    rerender(<File file={testFile} selectedFile={{ file: 'notblah.mp3' }} />);
    expect(queryByTestId('file-select')).not.toHaveClass(bgClassName);
  });
});
