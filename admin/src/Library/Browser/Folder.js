import React from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import { listStyleNone } from '../../styles';
import File from './File';

const folderStyles = stylish({
  border: '1px solid black',
  cursor: 'pointer',
  padding: '1rem',
});


const Folder = ({ folder, isExpanded, actionFn, folderContents, selectFile }) => {
  return <li className={listStyleNone}>
    <div>
      <div className={folderStyles} onClick={() => actionFn(folder)}>
        <strong>{folder}</strong>
      </div>
      {isExpanded && <ul>
        {folderContents.map(file => <File
          key={file}
          file={file}
          selectFile={selectFile}
          folder={folder}
        />)}
      </ul>}
    </div>
  </li>
}

export default Folder;