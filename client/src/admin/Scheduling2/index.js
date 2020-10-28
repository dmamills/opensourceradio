import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import moment from 'moment';

import DayOfWeek from './DayOfWeek';
import EditSchedule from '../Scheduling/EditSchedule';

import { getSchedules } from '../api';
import { DATE_FORMAT } from '../../utils';
import { p1, flex, column, spaceBetween, flexCenter, flexWrap } from '../../styles';

const dow = ['Sunday','Monday',"Tuesday", 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const schedulesToDaysOfWeek = () => {
  return getSchedules()
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
  .then(s => Object.keys(s).map(day => ({
        day,
        blocks: s[day]
    })))
  .then(s => {
    const blocks = dow.map(day => ({ day, blocks: [] })).map(b => {
      let sb = s.find(x => x.day === b.day);
      if(sb) b.blocks = sb.blocks;
      return b;
    });
    return blocks;
  })
}

const Scheduling = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const fetchSchedules = () => { schedulesToDaysOfWeek().then(setSchedules); }
  const back = () => { setShowEdit(false); }
  const onEdit = (chosenSchedule) => {
    setShowEdit(true);
    setSelectedSchedule(chosenSchedule);
  }

  useEffect(() => { fetchSchedules() }, [false]);

  return (
    <div className={cn(p1)}>
      <div className={cn(flex, column)}>
        <div className={cn(flex, spaceBetween, flexCenter)}>
        <h1>Scheduling</h1>
          <div>
            <button onClick={() => { setShowEdit(!showEdit)}}>{showEdit ? 'Back': 'Create New Schedule'}</button>
            <button onClick={() => { fetchSchedules(); }}>Refresh</button>
          </div>
        </div>
        {showEdit ?   <EditSchedule
            schedule={selectedSchedule}
           back={back}
         />:
        <div className={cn(flex, flexWrap)}>
          {schedules.map(dayOfWeek => <DayOfWeek onEdit={onEdit} dayOfWeek={dayOfWeek} key={dayOfWeek.day} />)}
        </div>}
      </div>
    </div>
  );
}

export default Scheduling;
