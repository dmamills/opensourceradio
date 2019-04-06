import React from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';

import Tab from './Tab';
import { whiteBg, blackText, listStyleNone, flex, p1, m05, p0, flexAuto } from '../styles';

const box = stylish({
  display: 'flex',
  flexFlow: 'column',
  height: '100%'
});

const Tabs = props => {
  const { currentTab, tabs, changeTab } = props;
  const CurrentComponent = tabs[currentTab].component;
  return (
    <div className={cn(blackText, p1, box)}>
      <ul className={cn(listStyleNone, flex, p0, m05)}>
        {tabs.map((tab, idx) => 
          <Tab
            key={tab.key}
            tab={tab}
            changeTab={changeTab}
            isSelected={currentTab === idx} 
          />
        )}
      </ul>
      <div className={cn(whiteBg, flexAuto)}>
        <CurrentComponent />
      </div>
    </div>
  );
}


export default Tabs;