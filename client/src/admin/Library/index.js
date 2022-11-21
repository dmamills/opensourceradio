import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { flex, p1, spacedEvenly, flex1, column } from '../../styles';
import { getLibrary } from '../api';
import AudioMetadata from './AudioMetadata';
import AudioUpload from './AudioUpload';
import Browser from './Browser';

const Library = () => {
  const [library, setLibrary] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchLibrary =  async () => {
    try {
      const fetchedLibrary = await getLibrary()
      setLibrary(fetchedLibrary);
    } catch(err) {
      console.log('error fetching library: ', err);
    }
  }

  const selectFile = (file) => setSelectedFile(file);

  useEffect(() => {
    fetchLibrary();
  }, [false]);

  return (
    <div className={cn(p1)}>
      <h1>Library</h1>
      <div className={cn(flex, spacedEvenly)}>
        <Browser
          library={library}
          selectFile={selectFile}
          selectedFile={selectedFile}
        />
        <div className={cn(flex, flex1, column)}>
          <AudioMetadata
            selectedFile={selectedFile}
            fetchLibrary={fetchLibrary}
          />
          <AudioUpload
            fetchLibrary={fetchLibrary}
          />
        </div>
      </div>
    </div>
  );
}

export default Library;
