import React from 'react';
import cn from 'classnames';

import { flex, spaceBetween, alignItemsCenter, p05, heavyText } from '../../styles';

const Label = ({ labelName, children }) => {
  return (
    <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
      <label className={heavyText} htmlFor="description">{labelName}</label>
      {children}
    </div>
  );
};

export default Label;
