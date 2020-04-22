import React, { useState, useEffect } from 'react';

import StreamStat from './StreamStat';
import { getStreamStatus, postStartStream, postStopStream } from '../api';

const StreamControls = () => {
  const [streamStatus, setStreamStatus] = useState(null);
  const [statusMessage, setStatusMessage ] = useState('stopped');
  const onStart = () => {
    postStartStream().then(status => setStreamStatus(status));
  };

  const onStop = () => {
    postStopStream().then(status => setStreamStatus(status));
  };

  useEffect(() => {
    getStreamStatus().then(status => setStreamStatus(status));
  }, [false]);


  useEffect(() => {
    if(streamStatus) setStatusMessage(streamStatus.status);
  }, [streamStatus]);

  return (
    <>
      <div>
        <StreamStat label="Current Status" value={statusMessage} />
      </div>
      <div>
        <button onClick={onStart}>Start</button>
        <button onClick={onStop}>Stop</button>
      </div>
    </>
  );
};

export default StreamControls;
