import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import ChatInput from './ChatInput';
import History from './History';
import { flex, column, flex2, ph1 } from '../styles';
import { getName, setName as setStorageName, getHistory } from '../api';

const nameInUse = () => ({
    name: 'Admin',
    message: 'Name already in use!',
    timestamp: Date.now()
});

const Chat = ({ socket }) => {
  const [name, setName] = useState(null);
  const [messages, setMessages] = useState([]);

  const onNameAccepted = ({ name }) => {
    setName(name);
    setStorageName(name);
  }

  const onNameInUse = () => addMessage(nameInUse());
  const addMessage = (msg) => setMessages(messages => [...messages, msg]);

  const sendMessage = message => {
    socket.emit('message', {
      message,
      name,
      timestamp: Date.now()
    });
  }

  const sendName = name => {
    if(!name) {
        socket.emit('name-unset', { name });
        setName(name);
    } else {
        socket.emit('name-set', { name });
        socket.once('name-accepted', onNameAccepted);
    }
  }

  useEffect(() => {
    socket.on('message', addMessage);
    socket.on('name-used', onNameInUse);
    const storedName = getName();
    if(storedName) {
        socket.emit('name-set', { name: storedName });
        socket.once('name-accepted', onNameAccepted);
    }

    return function() {
      socket.off('message', addMessage);
      socket.off('name-used', onNameInUse);
    }
  }, [socket]);

    useEffect(() => {
        getHistory().then(newMessages => setMessages(newMessages));
    }, [false])

  return (
    <div className={cn(flex, flex2, column, ph1)}>
      <History
        messages={messages}
      />
      <ChatInput
        name={name}
        sendName={sendName}
        sendMessage={sendMessage}
      />
    </div>
  );
}

export default Chat;
