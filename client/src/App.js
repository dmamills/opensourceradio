import React, { Component } from 'react';
import io from 'socket.io-client';
import cn from 'classnames';

import Chat from './Chat';
import StreamPlayer from './StreamPlayer';
import Header from './Header';
import Footer from './Footer';
import { flex } from './styles';
import { SERVER_URL } from './api';

class App extends Component {
  componentWillMount() {
    this.socket = io.connect(SERVER_URL);
  }

  componentWillUnmount() {
    this.socket.close();
  };

  render() {
    return (
      <React.Fragment>
        <Header socket={this.socket} />
        <div className={cn(flex, 'app-container')}>
          <StreamPlayer />
          <Chat socket={this.socket} />
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
