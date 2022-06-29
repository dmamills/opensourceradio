import React, { useState, useEffect } from 'react';

import StreamStat from './StreamStat';
import Button from '../components/Button';
import { getStreamStatus, postStartStream, postStopStream } from '../api';
import { ml1 } from '../../styles';

const StreamControls = () => {
  const [streamStatus, setStreamStatus] = useState(null);
  const [statusMessage, setStatusMessage ] = useState('stopped');
  const onStart = async () => {
    const status = await postStartStream();
    setStreamStatus(status);
  };

  const onStop = async () => {
    const status = await postStopStream();
    setStreamStatus(status);
  };

  useEffect(() => {
    const fn = async () => {
      const status = await getStreamStatus()
      setStreamStatus(status);
    }
    fn();
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
        <Button onClick={onStart} text="Start" />
        <Button className={ml1} onClick={onStop} text="Stop" />
      </div>
    </>
  );
};

export default StreamControls;
