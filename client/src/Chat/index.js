import React, { Component } from 'react';
import io from "socket.io-client";
import cn from 'classnames';

import ChatInput from './ChatInput';
import History from './History';
import Message from './Message';
import { flex, column, flex2, ph1 } from '../styles';
import { getName, setName, SERVER_URL, getHistory } from '../api';

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

  render() {
    const { messages, name } = this.state;
    return (
      <div className={cn(flex, flex2, column, ph1)}>
        <History
          messages={messages}
          renderMessage={m => Message(m)}
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
