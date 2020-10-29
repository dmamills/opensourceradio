import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { getSchedules } from '../api';
import Table from './Table'
import EditSchedule from './EditSchedule';
import Buttons from './Buttons';
import Title from './Title';
import { p1, flex, spaceBetween, flexCenter } from '../../styles';

const Scheduling = () => {
  const [schedules, setSchedules] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const fetchSchedules = () => {
    getSchedules()
      .then(setSchedules);
  }

  const onEdit = (chosenSchedule) => {
    setShowEdit(true);
    setSelectedSchedule(chosenSchedule);
  }

  const back = () => {
    setShowEdit(false);
    fetchSchedules();
  }

  useEffect(() => { fetchSchedules() }, [false]);

  return (
    <div className={cn(p1)}>
      <div className={cn(flex, spaceBetween)}>
        <Title showEdit={showEdit} selectedSchedule={selectedSchedule} />
        <div className={cn(flex, flexCenter)}>
          <Buttons showEdit={showEdit} back={back} onEdit={onEdit} fetchSchedules={fetchSchedules} />
        </div>
      </div>
      <div>
        {showEdit ?
         <EditSchedule
           schedule={selectedSchedule}
           back={back}
         /> :
         <Table
           schedules={schedules}
           onEdit={onEdit}
           refresh={fetchSchedules}
         />
        }
      </div>
    </div>
  );
}

export default Scheduling;
