import React from 'react';
import moment from 'moment';

import HasRun from './HasRun';
import Runtime from './Runtime';
import { getPlaylistDuration } from '../../../utils';

const Preview = ({ schedule }) => {
  const startTime = moment(schedule.start_time);
  if(startTime.isBefore(moment())) {
    return <HasRun schedule={schedule} />
  }

  const playlistDuration = getPlaylistDuration(schedule.dropdown);
  const fromNow = startTime.fromNow();
  const endTime = startTime.clone().add(playlistDuration, 's').endOf('m');

  return (
    <div>
      <p>This schedule will run {fromNow}.</p>
      <p>Starting {startTime.format('dddd MMMM Do')} at {startTime.format('hh:mm a')} until {endTime.format('hh:mm a')}.</p>
      <Runtime playlist={schedule.dropdown} />
    </div>
  );
}

export default Preview;
