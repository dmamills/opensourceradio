import React from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import { flex, flex1 } from '../../styles';

import File from './File';

const Folder = ({ folder, isExpanded, actionFn, folderContents, selectFile }) => {
  return <li>
    <div>
      <strong onClick={() => actionFn(folder)}>{folder}</strong>
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