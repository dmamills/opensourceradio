import React from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';

import { flex, listStyleNone, p1, whiteText } from '../styles';
import { parseTime } from '../utils';

const msgStyles = stylish({
  ':nth-child(odd)': {
    backgroundColor: 'rgba(211,211,211, 0.2)'
  },
  ":nth-child(even)": {
    backgroundColor: 'rgba(169,169,169, 0.2)'
  }
});

const Message = props => {
  const { timestamp, name, message } = props;
  return (
    <li
      className={cn(flex, listStyleNone, p1, msgStyles)}
      key={`${name}-${timestamp}`}
    >
      <div>
        <strong className={whiteText}>[{parseTime(timestamp)}]</strong>
        <strong className={whiteText}>{` <${name}> `}</strong>
        <span className={whiteText}>{message}</span>
      </div>
    </li>
  );
}

export default Message;
