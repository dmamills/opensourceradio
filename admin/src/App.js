import React, { Component } from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';

import LoginPage from './Login';
import Tabs from './Tabs';
import Scheduling from './Scheduling';
import Library from './Library';
import { fetchKey } from './api';

import { whiteText } from './styles';

const box = stylish({
  display: 'flex',
  flexFlow: 'column',
  height: '100%'
});

const defaultTabs = [
  { key: 'scheduling', component: Scheduling, name: 'Scheduling' },
  { key: 'library', component: Library, name: 'Library' },
];

class App extends Component {
  state = {
    currentTab: 0,
    apiKey: null
  }

  componentWillMount() {
    this.onAuthChange();
  }

  onAuthChange = () => {
    const apiKey = fetchKey();
    this.setState({
      apiKey
    });
  }

  changeTab = key => {
    const tab = defaultTabs.find(t => t.key === key);
    const currentTab = defaultTabs.indexOf(tab);
    this.setState({
      currentTab
    });
  }

  render() {
    const { currentTab, apiKey } = this.state;
    return (
      <div className={cn(box, whiteText)}>
        {!apiKey ?
          <LoginPage onAuthChange={this.onAuthChange} /> :
          <Tabs
            currentTab={currentTab}
            tabs={defaultTabs}
            changeTab={this.changeTab}
          />
        }
      </div>
    );
  }
}

export default App;
