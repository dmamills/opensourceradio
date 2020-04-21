import React from 'react';
import { render } from '@testing-library/react';
import History from './History';
import Message from './Message';

describe('History Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<History messages={[]} renderMessage={m => Message(m)}/>);
    expect(getByText('No Messages Yet!')).toBeInTheDocument();
  });

  it('renders messages passed to it', () => {
    const testMessage = {
      name: 'TestBoy',
      message: 'Hello world',
      timestamp: '2019-12-18T18:00:00.001Z'
    };


    //TODO fix: getText to be based on timestamp
    const { getByText } = render(<History messages={[testMessage]} renderMessage={m => Message(m)}/>);
    expect(getByText(testMessage.message)).toBeInTheDocument();
    expect(getByText(`<${testMessage.name}>`)).toBeInTheDocument();
    expect(getByText(`[01:00]`)).toBeInTheDocument();
  });
});
