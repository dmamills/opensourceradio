import React, { useState } from 'react';
import stylish from '@dmamills/stylish';
import cn from 'classnames';
import { flex, flex2, p05, textCenter, whiteText, mr1, spaceBetween } from '../styles';

const [ nameField, container ] = stylish({
  width: '150px',
}, {
  borderTop: '1px solid rgba(0, 0, 0, 0.4)',
  alignItems: 'center',
  backgroundColor: 'rgba(211, 211, 211, 0.2)',
});


const ChatInput = ({ name, sendName, sendMessage }) => {
  const [ message, setMessage ] = useState('');

  const onMessage = () => {
    if(message.length === 0) return;
    if(!name) {
      sendName(message);
    } else {
      sendMessage(message);
    }

    setMessage('');
  }

  const onKeyUp = (e) => {
    if(e.keyCode === 13) {
        onMessage();
    }
  }

  const onChange = ({ target }) => setMessage(target.value);
  const logout = () => sendName(null)

  return (
    <div className={cn(flex, flex2, container)}>
      <span
        className={cn(p05, textCenter, nameField, whiteText)}>
        {name || 'Enter Name:'}
      </span>
      <input
        placeholder={name ? 'Enter Message' : 'Enter Name'}
        className={cn(p05, flex2, mr1)}
        onKeyUp={onKeyUp}
        onChange={onChange}
        value={message}
        type="text"
      />
      <div className={cn(flex, spaceBetween, mr1)}>
        <button data-testid="submitButton" className={p05} onClick={onMessage}>Submit</button>
        { name && <button data-testid="logoutButton" className={p05} onClick={logout}>Logout</button> }
      </div>
    </div>
  );
}

export default ChatInput;
