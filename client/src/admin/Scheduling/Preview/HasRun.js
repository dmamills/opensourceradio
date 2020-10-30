import React from 'react';
import moment from 'moment';

import Runtime from './Runtime';
import { getPlaylistDuration } from '../../../utils';

const HasRun = ({ schedule }) => {
  const startTime = moment(schedule.start_time);
  const fromNow = startTime.fromNow();
  const playlistDuration = getPlaylistDuration(schedule.dropdown);
  const endTime = startTime.clone().add(playlistDuration, 's').endOf('m');
  return (
    <div>
      <p>This schedule is in the past. It ran {fromNow}.</p>
      <p>Started at {startTime.format('dddd MMMM Do')} at {startTime.format('hh:mm a')} until {endTime.format('hh:mm a')}.</p>
      <Runtime playlist={schedule.dropdown} isPast />
    </div>
  );
}

export default HasRun;