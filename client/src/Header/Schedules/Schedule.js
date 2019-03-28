import React from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import moment from 'moment';
import { flex, p1, alignItemsCenter } from '../../styles';

const TIME_FORMAT = 'hh:mm a';

const [scheduleContainer, activeSchedule, timeContainer ] = stylish({
  color: '#000',
  ':nth-child(odd)': {
    backgroundColor: 'rgba(238, 238, 238, 0.4)',
  },
  ':nth-child(even)': {
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  }
}, {
  backgroundColor: 'rgba(255, 255, 255, 0.8) !important',
  fontWeight: '600'
}, {
  width: '100px'
});

const isActiveSchedule = (startTime, endTime) => {
  const now = moment();
  return now.isAfter(startTime) && now.isBefore(endTime);
}

const Schedule = ({ schedule }) => {
  const { id, name, start_time, length, description } = schedule; 
  const startTime = moment(start_time);
  const endTime = startTime.clone().add(length, 'h');
  const isActive = isActiveSchedule(startTime, endTime);
  let timeString = startTime.format(TIME_FORMAT);

  if(startTime.isSame(moment().startOf('day')) && length === 24) {
    timeString = 'All Day!';
  }

  return (
    <div key={id} className={cn(flex, scheduleContainer, p1, (isActive ? activeSchedule : ''))}>
      <div className={cn(p1, flex, alignItemsCenter, timeContainer)}>
        <strong>{timeString}</strong>
      </div>
      <div className={cn(p1)}>
        <strong>{name}</strong>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Schedule;