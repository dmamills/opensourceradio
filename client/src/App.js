import React, { Component } from 'react';
import styles from './styles';
import Chat from './Chat';
import StreamPlayer from './StreamPlayer';

const { p1, textCenter, flex, column } = styles;

class App extends Component {
  render() {
    return (
      <div className={`App ${p1}`}>
        <h1 className={textCenter}>open source radio</h1>
        <div className={`${flex} ${column}`}>
          <StreamPlayer />
          <Chat />
        </div>
      </div>
    );
  }
}

export default App;
