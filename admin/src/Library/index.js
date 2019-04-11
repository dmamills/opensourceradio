import React, { Component } from 'react';
import cn from 'classnames';

import { flex, p1, spaceBetween, spacedEvenly, flex1, column } from '../styles';
import { getLibrary } from '../api';
import AudioMetadata from './AudioMetadata';
import AudioUpload from './AudioUpload';
import Browser from './Browser';

class Library extends Component {
  state = {
    library: {},
    selectedFile: null,
  }

  componentDidMount() {
    getLibrary()
      .then(library => {
        console.log(library);
        this.setState({ library });
      }).catch(err => {
        console.log(err);
      })
  }

  selectFile = selectedFile => {
    console.log('file selected', selectedFile);
    this.setState({
      selectedFile,
    })
  }
  render() {
    const { library, selectedFile } = this.state;
    return (
      <div className={cn(p1)}>
        <div className={cn(flex, spaceBetween)}>
          <h2>Audio Library</h2>
        </div>
        <div className={cn(flex, spacedEvenly)}>
          <Browser
            library={library}
            selectFile={this.selectFile}
          />
          <div className={cn(flex, flex1, column)}>
            <AudioMetadata
              selectedFile={selectedFile}
            />
           <AudioUpload />
          </div>
        </div>
      </div>
    );
  }
}

export default Library;