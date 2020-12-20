import React, { useRef, useEffect } from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';

import Message from './Message';
import { p0, m0, flex, justifyEnd, column } from '../styles';

const chatBox = stylish({
  height: '425px',
  overflowY: 'scroll',
});

const History = ({ messages }) => {
  const messagesEl = useRef(null);

  useEffect(() => {
      messagesEl.current.scrollTop = messagesEl.current.scrollHeight;
  });

  return (
    <div
      className={chatBox}
      ref={messagesEl}
    >
      <ul className={cn(flex, column, justifyEnd, m0, p0)}>
        { messages && messages.length ? messages.map(m => <Message key={`${m.message}${m.name}${m.timestamp}`} message={m} />) :
          <Message message={{name: 'Admin', message:'No Messages Yet!', timestamp: Date() }} />
        }
      </ul>
    </div>
  );
}

export default History;
