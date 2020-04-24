import React from 'react';
import { useHistory } from "react-router-dom";
import cn from 'classnames';

import Tab from './Tab';
import { storeKey } from '../api';
import { containerBox, whiteBg, blackText, listStyleNone, flex, m05, p0, m0, ph1, flexAuto, alignItemsCenter, spaceBetween } from '../../styles';

const logoutTab = { key: 'logout', name: 'Logout', };
const toStreamTab = { key: 'live', name: 'Radio', };

const Tabs = props => {
  const { currentTab, tabs, changeTab, onAuthChange } = props;
  const history = useHistory();
  const CurrentComponent = tabs[currentTab].component;
  return (
    <div className={cn(containerBox)}>
      <div className={cn(flex, alignItemsCenter, spaceBetween)}>
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
          <Tab
            key={toStreamTab.key}
            tab={toStreamTab}
            changeTab={() => { history.push('/'); }}
            isSelected={false}
          />
          <Tab
            key={logoutTab.key}
            tab={logoutTab}
            changeTab={() => { storeKey(null); onAuthChange(); }}
            isSelected={false}
          />
        </ul>
      </div>
      <div className={cn(blackText, whiteBg, flexAuto)}>
        <CurrentComponent />
      </div>
    </div>
  );
}

export default Tabs;
