import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ChatInput from './ChatInput';

describe('ChatInput Component', () => {
  it('renders without crashing', () => {
    const sendName = jest.fn();
    const sendMessage = () => {};
    const { getByText } = render(<ChatInput
                                   name={''}
                                   sendMessage={sendMessage}
                                   sendName={sendName}
                                 />);

    expect(getByText('Enter Name:')).toBeInTheDocument();
  });

  it('renders name and logout button when name provided', () => {
    const sendName = jest.fn();
    const sendMessage = () => {};
    const { getByText, getByTestId } = render(<ChatInput
                                 name={'tester'}
                                 sendMessage={sendMessage}
                                 sendName={sendName}
                                 />);

    expect(getByText('tester')).toBeInTheDocument();
    expect(getByTestId('submitButton')).toBeInTheDocument();
    expect(getByTestId('logoutButton')).toBeInTheDocument();
  });


  it('should call sendName when name is not set', () => {
    const sendName = jest.fn();
    const sendMessage = jest.fn();
    const { getByRole } = render(<ChatInput
                                 name={''}
                                 sendMessage={sendMessage}
                                 sendName={sendName}
                                 />);

    fireEvent.change(getByRole('textbox'), { target: { value: 'hello world' }});
    fireEvent.click(getByRole('button'));

    expect(sendName).toHaveBeenCalledWith('hello world');
  });


  it('should call sendMessage when name is set', () => {
    const sendName = () => {};
    const sendMessage = jest.fn();
    const { getByText, getByRole, getByTestId } = render(<ChatInput
                                 name={'tester'}
                                 sendMessage={sendMessage}
                                 sendName={sendName}
                                 />);

    fireEvent.change(getByRole('textbox'), { target: { value: 'hello world' }});
    fireEvent.click(getByTestId('submitButton'));
    expect(getByText('tester')).toBeInTheDocument();
    expect(sendMessage).toHaveBeenCalledWith('hello world');
  });


  it('should call sendName with null when logout pressed', () => {
    const sendName = jest.fn();
    const sendMessage = () => {};
    const { getByText, getByRole, getByTestId } = render(<ChatInput
                                                         name={'tester'}
                                                         sendMessage={sendMessage}
                                                         sendName={sendName}
                                                         />);

    fireEvent.click(getByTestId('logoutButton'));
    expect(sendName).toHaveBeenCalledWith(null);
  });
});
