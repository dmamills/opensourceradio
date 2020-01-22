import React, { Component } from 'react';
import cn from 'classnames';

import { flex, p1, spacedEvenly, flex1, column } from '../../styles';
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
    this.fetchLibrary();
  }

  fetchLibrary = () => {
    getLibrary()
    .then(library => {
      this.setState({ library });
    }).catch(err => {
      console.log('error fetching library: ', err);
    });
  }

  selectFile = selectedFile => {
    this.setState({
      selectedFile,
    });
  }
  
  render() {
    const { library, selectedFile } = this.state;
    return (
      <div className={cn(p1)}>
        <div className={cn(flex, spacedEvenly)}>
          <Browser
            library={library}
            selectFile={this.selectFile}
            selectedFile={selectedFile}
          />
          <div className={cn(flex, flex1, column)}>
            <AudioMetadata
              selectedFile={selectedFile}
              fetchLibrary={this.fetchLibrary}
            />
           <AudioUpload 
              fetchLibrary={this.fetchLibrary}
           />
          </div>
        </div>
      </div>
    );
  }
}

export default Library;
