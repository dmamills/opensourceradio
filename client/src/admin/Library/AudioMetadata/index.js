import React, { Component } from 'react';
import cn from 'classnames';
import { flex, spaceBetween, alignItemsCenter, p05, heavyText, flex2, ml1, ph1 } from '../../../styles';

import { updateMetadata, getMetadata, removeSong } from '../../api';
import MetadataActions from './MetadataActions';

class AudioMetadata extends Component {
  state = {
    selectedFile: null,
    isEditing: false,
    metadata: { artist: '', title: '', album: '' },
  }

  componentWillReceiveProps(nextProps) {
    const { selectedFile } = nextProps;
    if(selectedFile === this.props.selectedFile) return;

    getMetadata(selectedFile)
      .then(metadata => {
        this.setState({
          isEditing: false,
          selectedFile,
          metadata: {
            artist: metadata.artist || '',
            album: metadata.album || '',
            title: metadata.title || '',
          }
        });
      }).catch(error => {
        console.log(error);
      });
  }

  onSave = () => {
    const { selectedFile, metadata } = this.state;
    updateMetadata(selectedFile, metadata)
      .then(() => {
        this.setState({ isEditing: false })
      })
      .catch(error => {
        console.log(error);
      });
  }

  onDelete = () => {
    const { selectedFile } = this.state;
    removeSong(selectedFile)
      .then(() => {
        this.props.fetchLibrary();
        this.setState({
          selectedFile: null,
          isEditing: false,
          metadata: { artist: '', title: '', album: '' },
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  edit = () => {
    if(!this.state.selectedFile) return;
    this.setState({
      isEditing: true,
    });
  }

  cancel = () => this.setState({isEditing: false})

  onChangeTitle = (evt) => {
    const { metadata } = this.state;
    this.setState({
      metadata: {
        ...metadata,
        title: evt.target.value,
      }
    });
  }

  onChangeArtist = (evt) => {
    const { metadata } = this.state;
    this.setState({
      metadata: {
        ...metadata,
        artist: evt.target.value,
      }
    });
  }


  onChangeAlbum = (evt) => {
    const { metadata } = this.state;
    this.setState({
      metadata: {
        ...metadata,
        album: evt.target.value,
      }
    });
  }

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
            <input
              value={artist}
              className={cn(flex2, ml1)}
              type="text" disabled={!isEditing}
              onChange={this.onChangeArtist}
            />
          </div>
          <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
            <label className={heavyText} htmlFor="album">Album</label>
            <input
              value={album}
              className={cn(flex2, ml1)}
              type="text"
              disabled={!isEditing}
              onChange={this.onChangeAlbum}
            />
          </div>
          <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
            <label className={heavyText} htmlFor="title">Title</label>
            <input
              value={title}
              className={cn(flex2, ml1)}
              type="text"
              disabled={!isEditing}
              onChange={this.onChangeTitle}
            />
          </div>
          <MetadataActions
            isEditing={isEditing}
            selectedFile={selectedFile}
            save={this.onSave}
            delete={this.onDelete}
            edit={this.edit}
            cancel={this.cancel}
          />
        </div>
      </div>
    );
  }
}

export default AudioMetadata;
