import React from 'react';
import cn from 'classnames';

import Row from './Row';
import { width100, table, tableHeader } from '../../styles';

import { removeSchedule } from '../api';

const Table = ({ onEdit, schedules, refresh }) => {
  const onRemove = (id) => {
    if(!window.confirm('Are you sure you want to delete this schedule?')) return;
    removeSchedule(id)
      .then(() => {
        refresh();
      }).catch(err => {
        console.log(err);
      });
  }

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
        {schedules.map(s => <Row
          key={s.id}
          schedule={s}
          onEdit={onEdit}
          onRemove={onRemove}
        />)}
      </tbody>
    </table>
  );
}

export default Table;
