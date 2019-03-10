import React, { Component } from 'react';
import stylish from '@dmamills/stylish';
import cn from 'classnames';
import { flex, p05, textCenter, flex2 } from '../styles';

const nameField = stylish({
  width: '150px',
  backgroundColor: '#eee',
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
      <div className={flex}>
        <span
          className={cn(p05, textCenter, nameField)}>
          {name || 'Enter Name:'}
        </span>
        <input
          placeholder={name ? 'Enter Message' : 'Enter Name'}
          className={flex2}
          onKeyUp={this.onKeyUp}
          onChange={this.onChange}
          value={message}
          type="text"
        />
        <button onClick={this.onMessage}>Submit</button>
        { name && <button onClick={this.logout}>Logout</button> }
      </div>
    );
  }
}

export default ChatInput;
