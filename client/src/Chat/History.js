import React, { useRef, useEffect } from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import { p0, m0, flex, justifyEnd, column } from '../styles';

const chatBox = stylish({
  height: '425px',
  overflowY: 'scroll',
});

const History = ({ messages, renderMessage }) => {
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
        { messages.length ? messages.map(renderMessage) :
          renderMessage({ message: 'No Messages Yet!', name: 'Admin', timestamp: Date() })
        }
      </ul>
    </div>
  );
}

export default History;
