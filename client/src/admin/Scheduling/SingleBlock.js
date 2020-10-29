import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import moment from 'moment';
import stylish from '@dmamills/stylish';

import { pv05 } from '../../styles';

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

const SingleBlock = ({ schedule, onEdit }) => {
  const start = moment(schedule.start_time).format('hh:mm a');
  const end = moment(schedule.start_time).add(schedule.length, 'h').format('hh:mm a');
  return (
    <div className={blockStyles}>
      <strong >{schedule.name}</strong>
      <span className={pv05}>{start} - {end}</span>
      <button onClick={() => onEdit(schedule)}>Edit</button>
    </div>
  );
}

export default SingleBlock;