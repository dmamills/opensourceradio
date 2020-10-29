import React from 'react';

const SchedulingButtons = ({ showEdit, back, onEdit, fetchSchedules}) => {
  if(showEdit) {
    return (<>
      <button onClick={back}>Back</button>
    </>);
  }

  return (<>
    <button onClick={() => onEdit()}>Create New Schedule</button>
    <button onClick={fetchSchedules}>Refresh</button>
  </>);
}

export default SchedulingButtons;
