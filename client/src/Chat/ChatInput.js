import React, { Component } from 'react';
import stylish from '@dmamills/stylish';
import cn from 'classnames';
import { flex, flex2, p05, textCenter } from '../styles';

const [ nameField, container ] = stylish({
  width: '150px',
  backgroundColor: '#eee',
}, {
  borderTop: '1px solid black',
  alignItems: 'center',
  backgroundColor: '#eee'
});

class ChatInput extends Component {
  state = {
    message: ''
  }

  onMessage = () => {
    const { name } = this.props;
    const { message } = this.state;

    if(message.length === 0) return; 
    
    if(!name) {
      this.props.sendName(message);
    } else {
      this.props.sendMessage(message)
    }
    
    this.setState({
      message: ''
    });
  } 

  onChange = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  onKeyUp = (e) => {
    if(e.keyCode === 13) {
      this.onMessage();
    }
  }

  logout = () => {
    this.props.sendName(null);
  }

  render() {
    const { name } = this.props;
    const { message } = this.state;
    return (
      <div className={cn(flex, flex2, container)}>
        <span
          className={cn(p05, textCenter, nameField)}>
          {name || 'Enter Name:'}
        </span>
        <input
          placeholder={name ? 'Enter Message' : 'Enter Name'}
          className={cn(p05, flex2)}
          onKeyUp={this.onKeyUp}
          onChange={this.onChange}
          value={message}
          type="text"
        />
        <button className={p05} onClick={this.onMessage}>Submit</button>
        { name && <button className={p05} onClick={this.logout}>Logout</button> }
      </div>
    );
  }
}

export default ChatInput;
