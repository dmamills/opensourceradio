import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import moment from 'moment';
import stylish from '@dmamills/stylish';

import { getSchedules } from './api';
import { DATE_FORMAT } from '../utils';

import { p1, flex, column, spaceBetween, flexCenter, flexWrap, uppercase, width50px } from '../styles';

const blockStyles = stylish({
  height: '50px',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid black',
  margin: '0.5rem',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
});


const NoScheduleBlocks = () => {
  return (
    <div>
      <div className={blockStyles}>
        <strong>No Scheduling Today</strong>
        <span className={width50px}>random tunes 24hours straight!</span>
      </div>
    </div>
  );
}

const SingleBlock = ({ schedule }) => {
  const start = moment(schedule.start_time).format('hh:mm a');
  const end = moment(schedule.start_time).add(schedule.length, 'h').format('hh:mm a');
  return (
    <div className={blockStyles}>
      <strong>{schedule.name}</strong>
      <span>{start} - {end}</span>
      <a href="#">Edit</a>
    </div>
  );
}

const ScheduleBlocks = ({ blocks }) => {
  return (
    <div>
      {blocks.map(b => <SingleBlock key={b.id} schedule={b} />)}
    </div>
  );
}

const DayOfWeek = ({ dayOfWeek }) => {
  return (<div>
    <h2 className={uppercase}>{dayOfWeek.day}</h2>
    {dayOfWeek.blocks.length > 1 ? <ScheduleBlocks blocks={dayOfWeek.blocks}/> : <NoScheduleBlocks /> }
  </div>);
}

const Scheduling = () => {
  const [schedules, setSchedules] = useState([]);
  const fetchSchedules = () => {
    getSchedules()
      .then(s => {
        return s.map(schedule => {
          const dow = moment(schedule.start_time, DATE_FORMAT).format('dddd');
          schedule.dow = dow;
          return schedule;
        }).reduce((acc, schedule) => {
          if(acc[schedule.dow]) acc[schedule.dow].push(schedule);
          else acc[schedule.dow] = [schedule];
          return acc;
        }, {});
      })
      .then(s => {
        return Object.keys(s).map(day => {
          return {
            day,
            blocks: s[day]
          }
        })
      })
      .then(s => {
        let blocks = [
          { day: 'Sunday', blocks: [] },
          { day: 'Monday', blocks: [] },
          { day: 'Tuesday', blocks: [] },
          { day: 'Wednesday', blocks: [] },
          { day: 'Thursday', blocks: [] },
          { day: 'Friday', blocks: [] },
          { day: 'Saturday', blocks: [] },
        ].map(b => {
          let sb = s.find(x => x.day === b.day);
          if(sb) b.blocks = sb.blocks;
          return b;
        });
        return blocks;
      })
      .then(setSchedules);
  }

  useEffect(() => { fetchSchedules() }, [false]);

  return (
    <div className={cn(p1)}>
      <div className={cn(flex, column)}>
        <div className={cn(flex, spaceBetween, flexCenter)}>
        <h1>Scheduling</h1>
          <div>
            <button onClick={() => {}}>Create New Schedule</button>
          </div>
        </div>
        <div className={cn(flex, flexWrap)}>
          {schedules.map(dayOfWeek => <DayOfWeek dayOfWeek={dayOfWeek} key={dayOfWeek.day} />)}
        </div>
      </div>
    </div>
  );
}

export default Scheduling;
