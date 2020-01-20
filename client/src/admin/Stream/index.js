import React, { useState, useEffect } from 'react';

import { p1 } from '../../styles';
import { getStreamStats } from '../api';
import StreamControls from './StreamControls';

const StreamPage = () => {
    const [streamStats, setStreamStats] = useState(null);

    useEffect(() => {
      getStreamStats().then(stats => setStreamStats(stats));
    }, [false]);

    return (
      <div className={p1}>
        <h1>Stream</h1>
        <StreamControls />

        {streamStats &&<div>
          <h2>Stream State:</h2>
          <div>
            <strong>Schedule Id: </strong>
            <span>{streamStats.schedule_id}</span>
          </div>
          <div>
            <strong>Current Song: </strong>
            <span>{streamStats.file_name}</span>
          </div>
          <div>
            <strong>Start Time: </strong>
            <span>{streamStats.schedule_start_time}</span>
          </div>
          <div>
            <strong>End Time: </strong>
            <span>{streamStats.schedule_stop_time}</span>
          </div>
          <div>
            <strong>Playlist: </strong>
            <span>{streamStats.schedule_playlist}</span>
          </div>

        </div>}
      </div>
    );
}

export default StreamPage;
