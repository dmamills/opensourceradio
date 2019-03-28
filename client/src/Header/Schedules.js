import React from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';
import moment from 'moment';

import { flex, spaceBetween, mainTheme08, whiteText } from '../styles';

const modalContainer = stylish({
  position: 'absolute',
  top: '50px',
  right: '0',
  height: '600px',
  width: '400px',
  overflowY: 'scroll',
  padding: '1rem',
});

const Schedule = ({ schedule }) => {
  const { name, start_time, length } = schedule; 
}

const Schedules = ({ schedules }) => {
  return (
    <div className={cn(modalContainer, mainTheme08, whiteText)}>
      <div className={cn(flex, spaceBetween)}>
        <h1>Schedules</h1>
      </div>
      <p>Upcoming Schedules:</p>
      <ul>
        {schedules.map(({ name, start_time }) => {
          const val = `${name} - ${start_time}`;
          return <li key={val}>{val}</li>
        })}
      </ul>
    </div>
  );
}

export default Schedules;
