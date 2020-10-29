import React from 'react';

const SchedulingTitle = ({ showEdit, selectedSchedule }) => {
  let title = 'Edit Schedule';
  if(!showEdit) title = 'Scheduling';
  if(showEdit && !selectedSchedule) title = 'Create New Schedule';
  return <h2>{title}</h2>
}

export default SchedulingTitle;
