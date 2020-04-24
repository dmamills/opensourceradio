import React from 'react';
import moment from 'moment';
import cn from 'classnames';

import { flex2, ml1 } from '../../styles';
import {  getPlaylistDuration, durationToHuman } from '../../utils';

const HasRun = ({ schedule }) => {
  return (
    <div>
      <p>This schedule is in the past.</p>
    </div>
  );
}

const Preview = ({ schedule }) => {
  const startTime = moment(schedule.start_time);
  if(startTime.isBefore(moment())) {
    return <HasRun schedule={schedule} />
  }

  const fromNow = startTime.fromNow();

  return (
    <div>
      <p>This schedule will run {fromNow}.</p>
      <p>Starting {startTime.format('dddd MMMM Do')} at {startTime.format('hh:mm a')}.</p>
      <p>It will run for {durationToHuman(getPlaylistDuration(schedule.playlist))} playing {schedule.playlist.length} songs.
      </p>
    </div>
  );
}

export default Preview;
