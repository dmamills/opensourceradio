import React, { useState } from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import { flex, flex1, column, pl0 } from '../../../styles';

import Folder from './Folder';

const browserContainer = stylish({
  height: '550px',
  overflowY: 'scroll',
});

const Browser = ({ library, selectFile, selectedFile }) => {
  const [expanded, setExpanded] = useState({});

  const expand = (key) => {
    const updatedExpanded = {...expanded};
    updatedExpanded[key] = true;
    setExpanded(updatedExpanded);
  }

  const collapse = (key) => {
    const updatedExpanded = {...expanded};
    delete updatedExpanded[key];
    setExpanded(updatedExpanded);
  }

  const folders = Object.keys(library);
  return (
    <div className={cn(flex, flex1, browserContainer, column)}>
      <h3>Audio Browser</h3>
      <ul data-testid="library-list" className={cn(flex, column, flex1, pl0)}>
        {folders.map(folder => <Folder
          key={folder}
          folder={folder}
          actionFn={expanded[folder] ? collapse : expand}
          isExpanded={expanded[folder]}
          selectFile={selectFile}
          selectedFile={selectedFile}
          folderContents={library[folder]}
        />)}
      </ul>
    </div>
  )
}

export default Browser;
