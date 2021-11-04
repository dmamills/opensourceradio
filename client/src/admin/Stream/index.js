import React, { useState, useEffect } from 'react';

import StreamControls from './StreamControls';
import StreamStat from './StreamStat';
import { getStreamStats, removeSongLogs } from '../api';
import { formatDate, makeDefaultStreamStats } from '../../utils';
import { p1 } from '../../styles';

const StreamPage = () => {
    const [streamStats, setStreamStats] = useState({ ...makeDefaultStreamStats() });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const statInterval = setInterval(() => {
        setLoading(true);
        loadStats();
      }, 5000)
      loadStats();

      return () => {
        clearInterval(statInterval);
      }
    }, [false]);

  const loadStats = () => {
    getStreamStats().then(stats => {
      setStreamStats(stats);
      setLoading(false);
    });
  }

  const startTime = formatDate(streamStats.schedule_start_time);
  const stopTime = formatDate(streamStats.schedule_stop_time);
  const playlist = streamStats.schedule_playlist.split(',');

  const clearSongLogs = () => {
    removeSongLogs().then(result => {
      console.log('clear song log: ', result)
    });
  }

  return (
    <div className={p1}>
      <h1>Stream</h1>
      <StreamControls />
      <h2>Utility</h2>
      <button onClick={clearSongLogs}>Clear Song Logs</button>
      <h2>Stream State:</h2>
      { !loading && <div>
        <StreamStat label="Schedule Id" value={streamStats.schedule_id} />
        <StreamStat label="Current Song" value={streamStats.file_name} />
        <StreamStat label="Start Time" value={startTime} />
        <StreamStat label="End Time" value={stopTime} />
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
