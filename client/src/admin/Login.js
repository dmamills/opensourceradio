import React, { useState } from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';

import { authTest, storeKey } from './api';
import { flex, spaceBetween, column, redText, flex2, ml1, p05, blackText, p1, alignItemsCenter, heavyText, m05, justifyEnd } from '../styles';

const loginBox = stylish({
  width: '400px',
  backgroundColor: 'white',
});

const LoginPage = ({ onAuthChange }) => {
    const [error, setError] = useState(null);
    const [apiKey, setApiKey] = useState(null);

    const onChange = ({ target }) => setApiKey(target.value);

    const onSubmit = () => {
        console.log('onSubmt: ' + apiKey);
      authTest(apiKey)
        .then(success => {
            console.log('authTest');
          if(success) {
              console.log('victory!')
            storeKey(apiKey);
            onAuthChange();
          } else {
            setError('Invalid Key.');
          }
        });
    }

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
            data-testid="login"
            className={cn(flex2, ml1)}
            onChange={onChange}
            onKeyUp={e => { if(e.keyCode === 13) onSubmit()}}
          />
          </div>
          <div className={cn(flex, justifyEnd, redText)}>
            <strong style={{ visibility: error ? 'visible' : 'hidden'}}>{error || 'error'}</strong>
          </div>
          <div className={cn(flex, justifyEnd)}>
          <div className={cn(flex, justifyEnd, m05)}>
            <button onClick={onSubmit}>Submit</button>
          </div>
          <div className={cn(flex, justifyEnd, m05)}>
            <a href="/">Back</a>
          </div>
          </div>
        </div>
      </div>
    );
}

export default LoginPage;
