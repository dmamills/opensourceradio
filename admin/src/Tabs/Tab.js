import React from 'react';
import stylish from '@dmamills/stylish';
import cn from 'classnames';

import {
  p05,
  textDecorationNone,
} from '../styles';

const [ tabClass, link, selected ] = stylish({
  backgroundColor: 'white',
  width: '125px',
  margin: '0 0.5rem',
  textAlign: 'center',
  color: 'black',
  ':first-child': {
    marginLeft: '0',
  },
}, {
  color: 'black',
  ':visted': { color: 'black' },
  ':hover': { fontWeight: '800' }
}, {
  fontWeight: '800'
});


const Tab = ({ tab, changeTab, isSelected }) => {
  return (
    <li className={cn(p05, tabClass)}>
      <a
        href={`#${tab.key}`}
        onClick={() => changeTab(tab.key)}
        className={cn(textDecorationNone, link, (isSelected ? selected : false))}
      >
        {tab.name}
      </a>
    </li>
  )
}

export default Tab;