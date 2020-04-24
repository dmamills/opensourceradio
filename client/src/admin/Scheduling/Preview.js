import React from 'react';
import moment from 'moment';

import {  getPlaylistDuration, durationToHuman } from '../../utils';
const Runtime = ({ playlist }) => <p>It will run for {durationToHuman(getPlaylistDuration(playlist))} playing {playlist.length} songs.</p>

const HasRun = ({ schedule }) => {
  const startTime = moment(schedule.start_time);
  const fromNow = startTime.fromNow();
  const playlistDuration = getPlaylistDuration(schedule.playlist);
  const endTime = startTime.clone().add(playlistDuration, 's').endOf('m');
  return (
    <div>
      <p>This schedule is in the past. It ran {fromNow}.</p>
      <p>Started at {startTime.format('dddd MMMM Do')} at {startTime.format('hh:mm a')} until {endTime.format('hh:mm a')}.</p>
      <Runtime playlist={schedule.playlist} />
    </div>
  );
}

const Preview = ({ schedule }) => {
  const startTime = moment(schedule.start_time);
  if(startTime.isBefore(moment())) {
    return <HasRun schedule={schedule} />
  }

  const playlistDuration = getPlaylistDuration(schedule.playlist);
  const fromNow = startTime.fromNow();
  const endTime = startTime.clone().add(playlistDuration, 's').endOf('m');

  return (
    <div>
      <p>This schedule will run {fromNow}.</p>
      <p>Starting {startTime.format('dddd MMMM Do')} at {startTime.format('hh:mm a')} until {endTime.format('hh:mm a')}.</p>
      <Runtime playlist={schedule.playlist} />
    </div>
  );
}

export default Preview;
