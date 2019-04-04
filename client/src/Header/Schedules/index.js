import React from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';

import fillEmptyTime from './fillEmptyTime';
import Schedule from './Schedule';

import { flex, spaceBetween, mainTheme, whiteText, p1, p0, m0, ph1 } from '../../styles';

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
  return (
    <div className={cn(modalContainer, mainTheme, whiteText)}>
      <div className={cn(flex, spaceBetween, ph1)}>
        <h1 className={m0}>Today's Schedule</h1>
      </div>
      <div className={cn(p1)}>
        <p>opensourceradio is proudly hosted in Toronto Ontario Canada <span role="img" aria-label="canadian flag">🇨🇦</span></p>
        <p>All times are in Eastern Standard.</p>
        <ul className={p0}>
          {schedules.map(s => <Schedule key={s.id} schedule={s} />)}
        </ul>
      </div>
    </div>
  );
}

export default Schedules;
