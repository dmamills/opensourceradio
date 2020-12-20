import React from 'react';
import cn from 'classnames';

import fillEmptyTime from './fillEmptyTime';
import Schedule from './Schedule';

import { flex, spaceBetween, mainTheme, whiteText, p1, p0, m0, ph1, modalContainer } from '../../styles';

const Schedules = ({ schedules = []}) => {
  schedules = fillEmptyTime(schedules);
  return (
    <div className={cn(modalContainer, mainTheme, whiteText)}>
      <div className={cn(flex, spaceBetween, ph1)}>
        <h1 className={m0}>Today's Schedule</h1>
      </div>
      <div className={cn(p1)}>
        <p>opensourceradio is proudly hosted in Toronto Ontario Canada <span role="img" aria-label="canadian flag">🇨🇦</span></p>
        <p>All times are in Eastern Standard.</p>
        <ul data-testid="schedule-list" className={p0}>
          {schedules.map(s => <Schedule key={s.id} schedule={s} />)}
        </ul>
      </div>
    </div>
  );
}

export default Schedules;
