import React, { useState, useEffect } from 'react';
import { ph1 } from '../../../styles';

import { updateMetadata, removeSong } from '../../api';
import { durationToHuman } from '../../../utils';
import MetadataActions from './MetadataActions';
import MetadataInput from './MetadataInput';

const AudioMetadata = ({ selectedFile, fetchLibrary }) => {
  if(!selectedFile) return false;

  const [isEditing, setIsEditing] = useState(false);
  const [metadata, setMetadata] = useState({ artist: '', title: '', album: ''});
  const { artist, album, title } = metadata;
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setIsEditing(false);
    setDuration(selectedFile.metadata.duration);
    setMetadata({
      artist: selectedFile.metadata.artist || '',
      album: selectedFile.metadata.album || '',
      title: selectedFile.metadata.title || '',
    })
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
    updateMetadata(selectedFile.file, metadata)
      .then(() => setIsEditing(false))
      .catch(error => {
        console.log(error);
      });
  };

  const onDelete = () => {
    removeSong(selectedFile.fullFilename)
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
      <p><strong>Viewing</strong> {selectedFile.file}</p>
      <p><strong>Duration</strong> {durationToHuman(duration)}</p>
      <div>
        <MetadataInput value={artist} id="artist" label="Artist" onChange={onFieldChange('artist')} isEditing={isEditing} />
        <MetadataInput value={album} id="album" label="Album" onChange={onFieldChange('album')} isEditing={isEditing} />
        <MetadataInput value={title} id="title" label="Title" onChange={onFieldChange('title')} isEditing={isEditing} />
        <MetadataActions
          isEditing={isEditing}
          selectedFile={selectedFile.file}
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
