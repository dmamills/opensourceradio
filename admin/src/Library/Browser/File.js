import React from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import { pv1, mr05 } from '../../styles';

const  fileStyles = stylish({
  cursor: 'pointer',
  borderBottom: '1px solid black',
  listStyle: 'none',
});

const File = ({ selectFile, file, folder }) => {
  return (
    <li
      className={cn(fileStyles, pv1)}
      onClick={() => selectFile(`${folder === '/' ? '': `${folder}/`}${file}`)}
    >
      <span className={mr05} role="img" aria-label="song">🎵</span>
      <strong>{file}</strong>
    </li>
  );
}

export default File;