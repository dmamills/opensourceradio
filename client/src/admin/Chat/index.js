import React, { useState } from 'react';
import io from 'socket.io-client';
import cn from 'classnames';

import Chat from '../../Chat';
import { mainThemeBg, flex, column, p1,} from '../styles';
import { SERVER_URL } from '../api';

const ChatPage = () => {
    const [socket] = useState(() => {
        return io.connect(SERVER_URL);
    });

    return (
      <div className={cn(p1, flex, column )}>
        <h1>Chat</h1>
        <div className={mainThemeBg} style={{ width: '500px' }}>
          <Chat socket={socket} />
        </div>
      </div>
    );
}

export default ChatPage;
