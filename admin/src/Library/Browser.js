import React from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import { flex, flex1, pv1 } from '../styles';

const [ browserContainer, fileStyles ] = stylish({
  height: '550px',
  overflowY: 'scroll',
}, {
  cursor: 'pointer',
  borderBottom: '1px solid black',
})

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

const Browser = ({ library, selectFile }) => {
  const folders = Object.keys(library);
  return (
    <div className={cn(flex, flex1, browserContainer)}>
      <ul>
        {folders.map(folder => {
          return <li key={folder}>
            <div>
              <strong>{folder}</strong>
              <ul>
                {library[folder].map(file => <File
                  key={file}
                  file={file}
                  selectFile={selectFile}
                  folder={folder}
                />)}
              </ul>
            </div>
          </li>
        })}
      </ul>
    </div>
  )
}

export default Browser;