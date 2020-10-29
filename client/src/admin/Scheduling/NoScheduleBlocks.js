import React from 'react';
import stylish from '@dmamills/stylish';

import { width50px } from '../../styles';

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


const NoScheduleBlocks = () => {
  return (
    <div>
      <div className={blockStyles}>
        <strong>No Scheduling Today</strong>
        <span className={width50px}>random tunes 24hours straight!</span>
      </div>
    </div>
  );
}

export default NoScheduleBlocks;