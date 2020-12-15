import React from 'react';
import cn from 'classnames';

import { flex, spaceBetween as sb, alignItemsCenter, p05, heavyText } from '../../styles';

const Label = ({ labelName, spaceBetween = true, children }) => {
  return (
    <div className={cn(flex, spaceBetween ? sb : false, alignItemsCenter, p05)}>
      <label className={heavyText} htmlFor="description">{labelName}</label>
      {children}
    </div>
  );
};

export default Label;
