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
  const fullFilename = `${folder === '/' ? '': `${folder}/`}${file}`;
  const isSelected = selectedFile === fullFilename;
  return (
    <li
      className={cn(fileStyles, pv1, pl1, (isSelected ? selectedFileStyle : ''))}
      onClick={() => selectFile(fullFilename)}
    >
      <span className={mr05} role="img" aria-label="song">🎵</span>
      <strong>{file}</strong>
    </li>
  );
}

export default File;
