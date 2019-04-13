import React from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';

import Tab from './Tab';
import { whiteBg, whiteText, blackText, listStyleNone, flex, m05, p0, m0, ph1, flexAuto, alignItemsCenter, spaceBetween } from '../styles';

const box = stylish({
  display: 'flex',
  flexFlow: 'column',
  height: '100%'
});

const Tabs = props => {
  const { currentTab, tabs, changeTab } = props;
  const CurrentComponent = tabs[currentTab].component;
  return (
    <div className={cn(blackText, box)}>
      <div className={cn(whiteText, flex, alignItemsCenter, spaceBetween)}>
        <h1 className={cn(m0, ph1)}>opensourceradio admin</h1>
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
      </div>
      <div className={cn(whiteBg, flexAuto)}>
        <CurrentComponent />
      </div>
    </div>
  );
}

export default Tabs;