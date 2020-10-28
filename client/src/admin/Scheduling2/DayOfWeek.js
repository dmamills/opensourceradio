import React from 'react';
import { uppercase } from '../../styles';

import NoScheduleBlocks from './NoScheduleBlocks';
import ScheduleBlocks from './ScheduleBlocks';

const DayOfWeek = ({ dayOfWeek, onEdit }) => {
  return (<div>
    <h2 className={uppercase}>{dayOfWeek.day}</h2>
    {dayOfWeek.blocks.length > 0 ? <ScheduleBlocks onEdit={onEdit} blocks={dayOfWeek.blocks}/> : <NoScheduleBlocks /> }
  </div>);
}

export default DayOfWeek;