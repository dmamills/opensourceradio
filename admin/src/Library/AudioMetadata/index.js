import React, { Component } from 'react';
import cn from 'classnames';
import { flex, spaceBetween, alignItemsCenter, p05, heavyText, flex2, ml1, ph1 } from '../../styles';

import { getMetadata } from '../../api';
import MetadataActions from './MetadataActions';

class AudioMetadata extends Component {
  state = {
    selectedFile: null,
    isEditing: false,
    metadata: { artist: null, title: null, album: null },
  }

  componentWillReceiveProps(nextProps) {
    const { selectedFile } = nextProps;
    if(selectedFile === this.props.selectedFile) return;

    getMetadata(selectedFile)
      .then(metadata => {
        this.setState({
          selectedFile,
          metadata
        });
      }).catch(error => {
        console.log(error);
      })
  }

  edit = () => {
    if(!this.state.selectedFile) return;
    this.setState({
      isEditing: true,
    });
  }

  cancel = () => this.setState({isEditing: false})

  render() {
    const { metadata, isEditing, selectedFile } = this.state;
    const { artist, album, title } = metadata;
    return (
      <div className={ph1}>
        <h3>Audio Metadata</h3>
        {selectedFile && <p>Viewing {selectedFile}</p>}
        <div>
          <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
            <label className={heavyText} htmlFor="artist">Artist</label>
            <input defaultValue={artist} className={cn(flex2, ml1)} type="text" disabled={!isEditing} />
          </div>
          <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
            <label className={heavyText} htmlFor="album">Album</label>
            <input defaultValue={album} className={cn(flex2, ml1)} type="text" disabled={!isEditing} />
          </div>
          <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
            <label className={heavyText} htmlFor="title">Title</label>
            <input defaultValue={title} className={cn(flex2, ml1)} type="text" disabled={!isEditing} />
          </div>
          <MetadataActions
            selectedFile={selectedFile}
            edit={this.edit}
            cancel={this.cancel}
          />
        </div>
      </div>
    );
  }
}

export default AudioMetadata;