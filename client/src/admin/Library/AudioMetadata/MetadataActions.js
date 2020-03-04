import React from 'react';
import cn from 'classnames';
import { flex, justifyEnd, m05 } from '../../../styles';

const MetadataActions = ({ isEditing, selectedFile, save, cancel, deleteFile, edit}) => {
  const onDelete = () => {
    if(!selectedFile) return;
    if(window.confirm(`Delete ${selectedFile}?`)) {
      deleteFile();
    }
  }

  if(isEditing) {
    return (
      <div className={cn(flex, justifyEnd, m05)}>
        <button onClick={save}>Save</button>
        <button onClick={cancel}>Cancel</button>
      </div>
    );
  }

  return (
    <div className={cn(flex, justifyEnd, m05)}>
      <button onClick={onDelete}>Delete</button>
      <button onClick={edit}>Edit</button>
    </div>
  );
}

export default MetadataActions;
