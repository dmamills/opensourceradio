import React, { useState } from 'react';
import cn from 'classnames';

import LoginPage from './Login';
import Tabs from './Tabs';
import Scheduling from './Scheduling';
import Scheduling2 from './Scheduling2';
import Library from './Library';
import StreamPage from './Stream';
import { fetchKey } from './api';

import { whiteText, containerBox } from '../styles';

const getKeyIndex = key => {
    const tab = defaultTabs.find(t => t.key === key);
    let foundCurrentTab = defaultTabs.indexOf(tab);
    return foundCurrentTab === -1 ? 0 : foundCurrentTab;
};

const defaultTabs = [
  { key: 'scheduling', component: Scheduling, name: 'Scheduling' },
  { key: 'scheduling2', component: Scheduling2, name: 'Scheduling2' },
  { key: 'library', component: Library, name: 'Library' },
  { key: 'stream', component: StreamPage, name: 'Stream'},
];

const App = () => {
  const [apiKey, setApiKey] = useState(() => fetchKey());
  const [currentTab, setCurrentTab] = useState(() => {
      return getKeyIndex(window.location.hash.substring(1));
  });

  const onAuthChange = () => setApiKey(fetchKey());
  const changeTab = key => setCurrentTab(getKeyIndex(key));

  return (
    <div className={cn(containerBox, whiteText)}>
      {!apiKey ?
       <LoginPage onAuthChange={onAuthChange} /> :
       <Tabs
         onAuthChange={onAuthChange}
         currentTab={currentTab}
         tabs={defaultTabs}
         changeTab={changeTab}
       />
      }
    </div>
  );
}

export default App;
