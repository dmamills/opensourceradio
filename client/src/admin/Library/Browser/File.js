import React from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import { pv1, mr05, pl1 } from '../../../styles';

const  [fileStyles, selectedFileStyle] = stylish({
  cursor: 'pointer',
  listStyle: 'none',
}, {
  backgroundColor: '#bac6d3',
});

const File = ({ selectFile, selectedFile, file, folder }) => {
  const isSelected = selectedFile === file;
  file.fullFilename = `${folder === '/' ? '': `${folder}/`}${file.file}`;
  return (
    <li
      data-testid="file-select"
      className={cn(fileStyles, pv1, pl1, (isSelected ? selectedFileStyle : ''))}
      onClick={() => selectFile(file)}
    >
      <span className={mr05} role="img" aria-label="song">🎵</span>
      <strong>{file.file}</strong>
    </li>
  );
}

export default File;
