import React from 'react';
import SingleBlock from './SingleBlock';

const ScheduleBlocks = ({ blocks,  onEdit }) => {
  return (
    <div>
      {blocks.map(b => <SingleBlock key={b.id} schedule={b} onEdit={onEdit} />)}
    </div>
  );
}

export default ScheduleBlocks;