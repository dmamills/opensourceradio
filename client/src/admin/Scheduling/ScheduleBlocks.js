import React from 'react';
import SingleBlock from './SingleBlock';

const ScheduleBlocks = ({ blocks,  onEdit, onDelete }) => {
  return (
    <div>
      {blocks.map(b => <SingleBlock key={b.id} schedule={b} onEdit={onEdit} onDelete={onDelete} />)}
    </div>
  );
}

export default ScheduleBlocks;