import React from 'react';
import moment from 'moment';
import stylish from '@dmamills/stylish';
import cn from 'classnames';

import { p05, pv05, flex, column, ml1, cursorPointer } from '../../styles';

const blockStyles = stylish({
  border: '1px solid black',
  margin: '0.5rem',
  padding: '1rem',
});

const SingleBlock = ({ schedule, onEdit, onDelete }) => {
  const start = moment(schedule.start_time).format('hh:mm a');
  const end = moment(schedule.start_time).add(schedule.length, 'h').format('hh:mm a');
  return (
    <div className={blockStyles}>
      <div className={cn(flex, column)}>
        <strong >{schedule.name}</strong>
        <span className={pv05}>{start} - {end}</span>
      </div>
      <div>
        <button className={cn(cursorPointer, p05)} onClick={() => onEdit(schedule)}>Edit</button>
        <button className={cn(ml1, p05, cursorPointer)} onClick={() => { onDelete(schedule)}}>Delete</button>
      </div>
    </div>
  );
}

export default SingleBlock;