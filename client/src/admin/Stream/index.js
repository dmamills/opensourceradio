import React, { useState, useEffect } from 'react';

import { p1 } from '../../styles';
import { getStreamStatus, postStartStream, postStopStream } from '../api';

const StreamPage = () => {
    const [streamStatus, setStreamStatus] = useState(null);
    const [statusMessage, setStatusMessage ] = useState('stopped');

    const onStart = () => {
      postStartStream().then(status => setStreamStatus(status));
    }

    const onStop = () => {
      postStopStream().then(status => setStreamStatus(status));
    }

    useEffect(() => {
      getStreamStatus().then(status => setStreamStatus(status));
    }, [false]);


    useEffect(() => {
        if(streamStatus) setStatusMessage(streamStatus.status);
    }, [streamStatus]);

    return (
      <div className={p1}>
        <h1>Stream</h1>
        <div>
          <div>
            <strong>Current Status:</strong>
            <span>{statusMessage}</span>
          </div>
        </div>
        <div>
            <button onClick={onStart}>Start</button>
            <button onClick={onStop}>Stop</button>
        </div>
        <div>
            <h2>Output</h2>
            <pre>{streamStatus && JSON.stringify(streamStatus, null, 2)}</pre>
        </div>
      </div>
    );
}

export default StreamPage;
