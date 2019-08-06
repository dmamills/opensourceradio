import React, { Component } from 'react';
import cn from 'classnames';

import ChatInput from './ChatInput';
import History from './History';
import Message from './Message';
import { flex, column, flex2, ph1 } from '../styles';
import { getName, setName, getHistory } from '../api';

class Chat extends Component {
  state = {
    name: null,
    message: '',
    messages: []
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on('message', this.addMessage);
    socket.on('name-used', this.onNameInUse);

    const name = getName();
    if(name) {
      socket.emit('name-set', { name });
      socket.once('name-accepted', this.onNameAccepted);
    }

    this.loadHistory();
  }

  onNameAccepted = ({ name }) => {
    setName(name);
    this.setState({
      name
    });
  }

  onNameInUse = () => {
    this.addMessage({
      name: 'Admin',
      message: 'Name already in use!',
      timestamp: Date.now()
    });
  }

  componentWillUnmount() {
    const { socket } = this.props;
    socket.off('message', this.addMessage);
    socket.off('name-used', this.onNameInUse);
  }

  loadHistory = () => {
    getHistory()
    .then((messages) => {
      this.setState({
        messages
      });
    });
  }

  addMessage = (msg) => {
    const { messages } = this.state;
    messages.push(msg);
    this.setState({
      messages,
    });
  }

  sendMessage = message => {
    const { name } = this.state;
    this.props.socket.emit('message', {
      message,
      name,
      timestamp: Date.now()
    });
  }

  sendName = name => {
    const { socket } = this.props;
    if(!name) {
      socket.emit('name-unset', { name: this.state.name });
      this.setState({ name });
    } else {
      socket.emit('name-set', { name });
      socket.once('name-accepted', this.onNameAccepted);
    }
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

export default Chat;
