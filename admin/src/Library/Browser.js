import React from 'react';
import cn from 'classnames';
import { flex, flex1 } from '../styles';

const Browser = ({ library, selectFile }) => {
  const folders = Object.keys(library);

  return (
    <div className={cn(flex, flex1)}>
      <ul>
        {folders.map(folder => {
          return <li key={folder}>
            <div>
              <strong>{folder}</strong>
              <ul>
                {library[folder].map(file => {
                  return <li key={file} onClick={() => selectFile(`${folder === '/' ? '': `${folder}/`}${file}`)}>{file}</li>
                })}
              </ul>
            </div>
          </li>
        })}
      </ul>
    </div>
  )
}

export default Browser;