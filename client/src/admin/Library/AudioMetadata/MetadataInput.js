import React from 'react';
import cn from 'classnames';
import { flex, spaceBetween, alignItemsCenter, p05, heavyText, flex2, ml1 } from '../../../styles';

const MetadataInput = ({ label, id, isEditing, value, onChange }) => {
  return (
      <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
        <label className={heavyText} htmlFor={id}>{label}</label>
        <input
          value={value}
          id={id}
          className={cn(flex2, ml1)}
          type="text"
          disabled={!isEditing}
          onChange={onChange}
        />
     </div>
  );
};

export default MetadataInput;
