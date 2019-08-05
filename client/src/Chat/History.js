import React, { Component } from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import { p0, m0, flex, justifyEnd, column } from '../styles';

const chatBox = stylish({
  height: '425px',
  overflowY: 'scroll',
});

class History extends Component {
  componentDidUpdate() {
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }

  render() {
    const { messages, renderMessage } = this.props;
    return (
      <div 
        className={chatBox}
        ref={el => { this.messagesEl = el; }}
      >
        <ul className={cn(flex, column, justifyEnd, m0, p0)}>
          { messages.length ? messages.map(renderMessage) :
            renderMessage({ message: 'No Messages Yet!', name: 'Admin', timestamp: Date() })
          }
        </ul>
      </div>
    );
  }
}

export default History;
