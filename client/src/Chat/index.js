import React, { Component } from 'react';
import io from "socket.io-client";
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import ChatInput from './ChatInput';
import History from './History';
import { listStyleNone, p1, flex2 } from '../styles';

import { getName, setName, SERVER_URL, getHistory } from '../api';
import { parseTime } from '../utils';

const msgStyles = stylish({
  ':nth-child(odd)': {
    backgroundColor: '#eee'
  },
  ":nth-child(even)": {
    backgroundColor: 'lightGrey'
  }
});

class Chat extends Component {
  state = {
    name: null,
    message: '',
    messages: [],
  }

  addMessage = (msg) => {
    const { messages } = this.state;
    messages.push(msg);
    this.setState({
      messages,
    }) 
  }

  componentDidMount() {
    this.socket = io.connect(SERVER_URL);
    this.socket.on("message", this.addMessage);

    const name = getName();
    if(name) {
      this.setState({
        name
      })
    }

    getHistory()
    .then((messages) => {
      this.setState({
        messages
      })
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  sendMessage = message => {
    const { name } = this.state;
    this.socket.emit('message', {
      message,
      name,
      timestamp: Date.now()
    });
  }

  sendName = name => {
    setName(name);
    this.setState({
      name
    });
  }

  renderMessage(msg) {
    const { timestamp, name, message } = msg;
    return (
      <li
        className={cn(listStyleNone, p1, msgStyles)}
        key={`${name}-${timestamp}`}
      >
        <div>
          <strong>[{parseTime(timestamp)}]</strong>
          <span>{` <`}</span>
          <strong>{name}</strong>
          <span>{`> `}</span>
          <span>{message}</span>
        </div>
      </li>
    );
  }

  render() {
    const { messages, name } = this.state;
    return (
      <div className={flex2}>
        <History
          messages={messages}
          renderMessage={this.renderMessage}
        />
        <ChatInput
          name={name}
          sendName={this.sendName}
          sendMessage={this.sendMessage}
        />
      </div>
    );
  } 
}

export default Chat
