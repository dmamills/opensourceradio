import React, { Component } from 'react';
import cn from 'classnames';

import Chat from './Chat';
import StreamPlayer from './StreamPlayer';
import Header from './Header';
import Footer from './Footer';
import { flex } from './styles';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className={cn(flex, 'app-container')}>
          <StreamPlayer />
          <Chat />
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
