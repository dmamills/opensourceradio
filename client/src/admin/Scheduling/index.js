import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import moment from 'moment';

import DayOfWeek from './DayOfWeek';
import EditSchedule from './EditSchedule';

import { getSchedules } from '../api';
import { reduceByKey, DATE_FORMAT, DAYS_OF_WEEK } from '../../utils';
import { p1, flex, column, spaceBetween, flexCenter, flexWrap } from '../../styles';

const schedulesToDaysOfWeek = async () => {
  const schedules = await getSchedules();
  const schedulesByBlock = schedules.map(schedule => {
    const dow = moment(schedule.start_time, DATE_FORMAT).format('dddd');
    schedule.dow = dow;
    return schedule;
  }).reduce(reduceByKey('dow'), {});

  const keyedByDay = Object.keys(schedulesByBlock).map(day => ({
    day,
    blocks: schedulesByBlock[day]
  }));

  const blocks = DAYS_OF_WEEK.map(day => ({ day, blocks: [] })).map(b => {
    let sb = keyedByDay.find(x => x.day === b.day);
    if(sb) b.blocks = sb.blocks;
    return b;
  });
  return blocks;
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
        {showEdit ? <EditSchedule
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
