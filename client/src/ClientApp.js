import React, { useState } from 'react';
import io from 'socket.io-client';
import cn from 'classnames';

import Chat from './Chat';
import StreamPlayer from './StreamPlayer';
import Header from './Header';
import Footer from './Footer';
import { flex } from './styles';
import { SERVER_URL } from './api';

const ClientApp = () => {
  const [socket] = useState(() => {
    return io.connect(SERVER_URL);
  });

  return (
      <>
      <Header socket={socket} />
      <div className={cn(flex, 'app-container')}>
      <StreamPlayer />
      <Chat socket={socket} />
      </div>
      <Footer />
      </>
  );
};

export default ClientApp;
