import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Folder from './Folder';

describe('Folder Component', () => {
  const folderName = 'mydir';
  const folderContents = [ { file: 'blah.mp3' }, { file: 'blah2.mp3' }];

  it('renders without crashing', () => {
    const { getByText } = render(<Folder folder={folderName} folderContents={folderContents} />);

    expect(getByText('mydir')).toBeInTheDocument();
  });

  it('should only render the folder contents when expanded', () => {
    const { rerender, queryByTestId, queryByText } = render(<Folder folder={folderName} folderContents={folderContents} isExpanded={true} />);

    expect(queryByTestId('folder-list')).toBeInTheDocument();
    expect(queryByText('blah.mp3')).toBeInTheDocument();
    expect(queryByText('blah2.mp3')).toBeInTheDocument();

    rerender(<Folder folder={folderName} folderContents={folderContents} isExpanded={false} />);
    expect(queryByTestId('folder-list')).not.toBeInTheDocument();
  });

  it('should invoke the expand function when button pressed', () => {
    const spyFn = jest.fn();
    const { queryAllByTestId } = render(<Folder folder={folderName} folderContents={folderContents} actionFn={spyFn} />);

    fireEvent.click(queryAllByTestId('folder-action')[0]);
    expect(spyFn).toBeCalled();
    expect(spyFn).toBeCalledWith(folderName);
  });
});
