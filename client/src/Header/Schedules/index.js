import React from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';

import fillEmptyTime from './fillEmptyTime';
import Schedule from './Schedule';

import { flex, spaceBetween, mainTheme, whiteText, p1, p0 } from '../../styles';

const modalContainer = stylish({
  position: 'absolute',
  top: '50px',
  right: '0',
  height: '600px',
  width: '600px',
  overflowY: 'scroll',
  padding: '1rem',
});

const Schedules = ({ schedules }) => {
  schedules = fillEmptyTime(schedules);
  debugger;
  return (
    <div className={cn(modalContainer, mainTheme, whiteText)}>
      <div className={cn(flex, spaceBetween, p1)}>
        <h1>Today's Schedule</h1>
      </div>
      <p>opensourceradio is proudly hosted in Toronto Canada. All times are in EST.</p>
      <ul className={p0}>
        {schedules.map(s => <Schedule key={s.id} schedule={s} />)}
      </ul>
    </div>
  );
}

export default Schedules;
