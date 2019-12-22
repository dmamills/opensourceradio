import React, { Component } from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';

import { authTest, storeKey } from './api';
import { flex, spaceBetween, column, redText, flex2, ml1, p05, blackText, p1, alignItemsCenter, heavyText, m05, justifyEnd } from './styles';

const loginBox = stylish({
  width: '400px',
  backgroundColor: 'white',
});

class LoginPage extends Component {
  state = {
    apiKey: null,
    error: null,
  }

  onChange = e => {
    const apiKey = e.target.value;
    this.setState({
      apiKey
    });
  }

  onSubmit = () => {
    const { apiKey } = this.state;
    authTest(apiKey)
      .then(success => {
        if(success) {
          storeKey(apiKey);
          this.props.onAuthChange();
        } else {
          this.setState({
            error: 'Invalid Key.'
          });
        }
      });
  }

  render() {
    const { error } = this.state;
    return (
      <div className={cn(flex, flex, column, alignItemsCenter)}>
        <h1>opensourceradio admin</h1>
        <div className={cn(loginBox, p1, flex, column, blackText)}>
          <p>Please enter api key to get started.</p>
          <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
          <label className={heavyText} htmlFor="api_key">Api Key</label>
          <input
            type="text"
            id="api_key"
            className={cn(flex2, ml1)}
            onChange={this.onChange}
            onKeyUp={e => { if(e.keyCode === 13) this.onSubmit()}}
          />
          </div>
          <div className={cn(flex, justifyEnd, redText)}>
            <strong style={{ visibility: error ? 'visible' : 'hidden'}}>{error || 'error'}</strong>
          </div>
          <div className={cn(flex, justifyEnd, m05)}>
            <button onClick={this.onSubmit}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
