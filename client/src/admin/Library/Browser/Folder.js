import React from 'react';
import stylish from '@dmamills/stylish';
import cn from 'classnames';

import { listStyleNone, mr05, p0 } from '../../../styles';
import File from './File';

const [folderList, folderStyles] = stylish({
  border: '1px solid black',
  borderRadius: '0.5rem',
  marginTop: '0.5rem',
  marginBottom: '0.5rem',
}, {
  cursor: 'pointer',
  padding: '1rem',
});

const Folder = ({ folder, isExpanded, actionFn, folderContents, selectFile, selectedFile }) => {
  return <li className={cn(listStyleNone, folderList)}>
    <div>
      <div className={folderStyles} onClick={() => actionFn(folder)}>
        <span className={mr05} role="img" aria-label="folder">🗂</span>
        <strong>{folder}</strong>
      </div>
      {isExpanded && <ul className={p0}>
        {folderContents.map(file => <File
          key={file}
          file={file}
          selectFile={selectFile}
          selectedFile={selectedFile}
          folder={folder}
        />)}
      </ul>}
    </div>
  </li>
}

export default Folder;
