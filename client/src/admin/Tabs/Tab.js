import React from 'react';
import stylish from '@dmamills/stylish';
import cn from 'classnames';

import { textDecorationNone } from '../styles';

const [ tabClass, link, selected ] = stylish({
  backgroundColor: 'white',
  textAlign: 'center',
  color: 'black',
  padding: '0.5rem 1rem',
  margin: '0 0.5rem',
  ':first-child': {
    marginLeft: '0',
  },
}, {
  color: 'black',
  width: '125px',
  padding: '0.5rem 1rem',
  ':visted': { color: 'black' },
  ':hover': { fontWeight: '800' }
}, {
  fontWeight: '800'
});

const Tab = ({ tab, changeTab, isSelected }) => {
  return (
    <li className={cn(tabClass)}>
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