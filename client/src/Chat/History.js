import React, { Component } from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import { m0, p0 } from '../styles';

const [ chatBox, h0 ] = stylish({
  maxHeight: '425px',
  overflowY: 'scroll',
  marginBottom: '-15px',
}, {
  height: '0px'
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
          className={h0}
          ref={(el) => { this.messagesEnd = el; }}
        >
        </li>
      </ul>
    );
  }
}

export default History
