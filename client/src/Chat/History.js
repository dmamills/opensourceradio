import React, { Component } from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import styles from '../styles';

const { m0, p0 } = styles;

const chatBox = stylish({
  maxHeight: '400px',
  overflowY: 'scroll'
});

class History extends Component {
  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({  behavior: 'smooth' });
  }

  render() {
    const { messages, renderMessage } = this.props;
    return (
      <ul className={cn(m0, p0, chatBox)}>
        {messages.length ? messages.map(renderMessage) :
          <li>No Messages</li>
        }
        <li 
          style={{ height: '0px' }}
          ref={(el) => { this.messagesEnd = el; }}
        >
        </li>
      </ul>
    );
  }

}

export default History