import React, { Component } from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import { flex, flex1, column, pl0, p1 } from '../../styles';

import Folder from './Folder';

const browserContainer = stylish({
  height: '550px',
  overflowY: 'scroll',
});

class Browser extends Component {
  state = {
    expanded:{}
  }

  expand = key => {
    const { expanded } = this.state;
    expanded[key] = true;
    this.setState({
      expanded
    });
  }

  collapse = key => {
    const { expanded } = this.state;
    delete expanded[key];
    this.setState({
      expanded
    });
  }

  render() {
    const { library, selectFile } = this.props;
    const { expanded } = this.state;
    const folders = Object.keys(library);
    return (
      <div className={cn(flex, flex1, browserContainer)}>
        <ul className={cn(flex, column, flex1, pl0)}>
          {folders.map(folder => <Folder
              key={folder}
              folder={folder}
              actionFn={expanded[folder] ? this.collapse : this.expand}
              isExpanded={expanded[folder]}
              selectFile={selectFile}
              folderContents={library[folder]}
          />)}
        </ul>
      </div>
    )
  }
}
export default Browser;