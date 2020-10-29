import React from 'react';
import cn from 'classnames';

import { p1, flex, justifyEnd, tableBody } from '../../styles';

const Row = ({ schedule, onEdit, onRemove }) => {
  schedule.description = schedule.description || '';
  const length = `${schedule.length} hour${schedule.length > 1 ? 's' : ''}`;
  const description = schedule.description.length <= 20 ? schedule.description : `${schedule.description.substr(0, 29)}...`;

  return (
    <tr className={cn(tableBody, p1)}>
      <td>{schedule.id}</td>
      <td>{schedule.name}</td>
      <td>{description}</td>
      <td>{schedule.start_time}</td>
      <td>{length}</td>
      <td className={cn(flex, justifyEnd)}>
        <button onClick={() => onEdit(schedule)}>Edit</button>
        <button onClick={() => onRemove(schedule.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default Row;
