import React from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import { pv1 } from '../../styles';

const  fileStyles = stylish({
  cursor: 'pointer',
  borderBottom: '1px solid black',
});

const File = ({ selectFile, file, folder }) => {
  return (
    <li
      className={cn(fileStyles, pv1)}
      onClick={() => selectFile(`${folder === '/' ? '': `${folder}/`}${file}`)}
    >
      {file}
    </li>
  );
}

export default File;