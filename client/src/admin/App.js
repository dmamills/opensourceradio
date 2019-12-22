import React, { useState } from 'react';
import cn from 'classnames';

import LoginPage from './Login';
import Tabs from './Tabs';
import Scheduling from './Scheduling';
import Library from './Library';
import { fetchKey } from './api';

import { whiteText, containerBox } from './styles';

const defaultTabs = [
  { key: 'scheduling', component: Scheduling, name: 'Scheduling' },
  { key: 'library', component: Library, name: 'Library' },
  { key: 'chat', component: () => <div>Chat</div>, name: 'Chat'},
  { key: 'stream', component: () => <div>Stream</div>, name: 'Stream'},
];

const App = () => {
  const [apiKey, setApiKey] = useState(() => fetchKey());
  const [currentTab, setCurrentTab] = useState(0);

  const onAuthChange = () => setApiKey(fetchKey());
  const changeTab = key => {
    const tab = defaultTabs.find(t => t.key === key);
    let foundCurrentTab = defaultTabs.indexOf(tab);
    if(foundCurrentTab === -1) {
      foundCurrentTab = 0;
    }

    setCurrentTab(foundCurrentTab);
  }

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
