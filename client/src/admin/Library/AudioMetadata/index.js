import React, { useState, useEffect } from 'react';
import { ph1 } from '../../../styles';

import { updateMetadata, getMetadata, removeSong } from '../../api';
import MetadataActions from './MetadataActions';
import MetadataInput from './MetadataInput';

const AudioMetadata = ({ selectedFile, fetchLibrary }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [metadata, setMetadata] = useState({ artist: '', title: '', album: ''});
  const { artist, album, title } = metadata;

  useEffect(() => {
    getMetadata(selectedFile)
      .then(metadata => {
        setIsEditing(false);
        setMetadata({
          artist: metadata.artist || '',
          album: metadata.album || '',
          title: metadata.title || '',
        })
      }).catch(error => {
        console.log(error);
      });
  }, [selectedFile]);


  const onFieldChange = (field) => {
    return ({ target }) => {
      setMetadata({
        ...metadata,
        [field]: target.value
      });
    }
  }

  const onSave = () => {
    updateMetadata(selectedFile, metadata)
      .then(() => setIsEditing(false))
      .catch(error => {
        console.log(error);
      });
  };

  const onDelete = () => {
    removeSong(selectedFile)
      .then(() => {
        fetchLibrary();
        setIsEditing(false);
        setMetadata({ artist: '', title: '', album: ''});
      })
      .catch(error => {
        console.log(error);
      });

  };

  const edit = () => {
    if(!selectedFile) return;
    setIsEditing(true);
  };

  const cancel = () => setIsEditing(false);

  return (
    <div className={ph1}>
      <h3>Audio Metadata</h3>
      {selectedFile && <p>Viewing {selectedFile}</p>}
      <div>
        <MetadataInput value={artist} id="artist" label="Artist" onChange={onFieldChange('artist')} isEditing={isEditing} />
        <MetadataInput value={album} id="album" label="Album" onChange={onFieldChange('album')} isEditing={isEditing} />
        <MetadataInput value={title} id="title" label="Title" onChange={onFieldChange('title')} isEditing={isEditing} />
        <MetadataActions
          isEditing={isEditing}
          selectedFile={selectedFile}
          save={onSave}
          deleteFile={onDelete}
          edit={edit}
          cancel={cancel}
        />
      </div>
    </div>
  );
}

export default AudioMetadata;
