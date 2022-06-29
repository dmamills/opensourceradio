import React from 'react';
import moment from 'moment';
import Runtime from './Runtime';
import { getPlaylistDuration } from '../../../utils';

const Preview = ({ schedule }) => {
  const startTime = moment(schedule.start_time);
  const playlistDuration = getPlaylistDuration(schedule.dropdown);
  const dayOfWeek = startTime.format('dddd')
  const endTime = startTime.clone().add(playlistDuration, 's').endOf('m');

  return (
    <div>
      <p>This schedule will run every <strong>{dayOfWeek}</strong></p>
      <p>Starting <strong>{startTime.format('MMMM Do')}</strong></p>
      <p>Running from: <strong>{startTime.format('hh:mm a')}</strong> until <strong>{endTime.format('hh:mm a')}</strong></p>
      <Runtime playlist={schedule.dropdown} isShuffle={schedule.shuffle} />
    </div>
  );
}

export default Preview;
