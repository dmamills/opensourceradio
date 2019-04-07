import React from 'react';
import cn from 'classnames';

import Row from './Row';
import { width100, table, tableHeader } from '../styles';

const Table = ({ schedules }) => {
  return (
    <table className={cn(width100, table)}>
      <thead className={tableHeader}>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Description</th>
          <th>Start Time</th>
          <th>Length</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {schedules.map(s => <Row key={s.id} schedule={s} />)}
      </tbody>
    </table>
  );
}

export default Table;