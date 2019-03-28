import React from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import moment from 'moment';
import { flex, p1 } from '../../styles';

const TIME_FORMAT = 'hh:mm a';

const [scheduleContainer, activeSchedule ] = stylish({
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
});

const isActiveSchedule = (startTime, endTime) => {
  const now = moment();
  return now.isAfter(startTime) && now.isBefore(endTime);
}

const Schedule = ({ schedule }) => {
  const { id, name, start_time, length } = schedule; 
  const startTime = moment(start_time);
  const endTime = startTime.clone().add(length, 'h');
  const isActive = isActiveSchedule(startTime, endTime);
  return (
    <div key={id} className={cn(flex, scheduleContainer, p1, (isActive ? activeSchedule : ''))}>
      <div className={cn(p1)}>
        {startTime.format(TIME_FORMAT)} - {endTime.format(TIME_FORMAT)}
      </div>
      <div className={cn(p1)}>
        {name}
      </div>
    </div>
  );
}

export default Schedule;