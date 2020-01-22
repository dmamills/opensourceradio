import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { p1 } from '../../styles';
import { getStreamStats } from '../api';
import StreamControls from './StreamControls';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const StreamPage = () => {
    const [streamStats, setStreamStats] = useState(null);

    useEffect(() => {
      getStreamStats().then(stats => setStreamStats(stats));
    }, [false]);

    const startTime = streamStats ? moment(streamStats.schedule_start_time).format(DATE_FORMAT) : '';
    const stopTime = streamStats ? moment(streamStats.schedule_stop_time).format(DATE_FORMAT) : '';
    const playlist = streamStats ? streamStats.schedule_playlist.split(',') : [];

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
            <span>{startTime}</span>
          </div>
          <div>
            <strong>End Time: </strong>
            <span>{stopTime}</span>
          </div>
          <div>
            <strong>Playlist: </strong>
            <ul>
                {playlist.map((song, idx) => <li key={`${song}-${idx}`}>{song}</li>)}
            </ul>
          </div>

        </div>}
      </div>
    );
}

export default StreamPage;
