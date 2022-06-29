import React from 'react';
import stylish from '@dmamills/stylish';
import cn from 'classnames';
import { flex, column, pv05 } from '../../styles';

const blockStyles = stylish({
  border: '1px solid black',
  margin: '0.5rem',
  padding: '1rem'
});

const NoScheduleBlocks = () => {
  return (
    <div>
      <div className={blockStyles}>
        <div className={cn(flex, column)}>
        <strong>No Scheduling Today</strong>
        <span className={pv05}>random tunes!</span>
        </div>
      </div>
    </div>
  );
}

export default NoScheduleBlocks;