import React from 'react';
import cn from 'classnames';

import { getSchedules } from '../api';
import Table from './Table'
import EditSchedule from './EditSchedule';
import { p1, flex, spaceBetween, flexCenter } from '../styles';

class Scheduling extends React.Component {
  state = {
    showEdit: false,
    selectedSchedule: null,
    schedules: []
  }

  componentDidMount() {
    this.fetchSchedules();
   }

  fetchSchedules = () => {
    getSchedules()
    .then(schedules => {
      this.setState({
        schedules,
      });
    });
  }

  onEdit = (selectedSchedule) => {
    this.setState({
      selectedSchedule,
      showEdit: true,
    })
  }

  back = () => {
    this.setState({ showEdit: false }, () => {
      this.fetchSchedules();
    });
  }

  renderButtons = () => {
    const { showEdit } = this.state;
    if(showEdit) {
      return (<>
        <button onClick={() => this.back()}>Back</button>
      </>);
    }

    return (<>
     <button onClick={() => this.onEdit()}>Create New Schedule</button>
     <button onClick={this.fetchSchedules}>Refresh</button>
    </>);
  }

  renderTitle = () => {
    const { showEdit, selectedSchedule } = this.state;
    if(!showEdit) return 'Scheduling';
    if(showEdit && !selectedSchedule) return 'Create New Schedule';
    else return 'Edit Schedule';
  }

  render() {
    const { schedules, showEdit, selectedSchedule } = this.state;
    return (
      <div className={cn(p1)}>
        <div className={cn(flex, spaceBetween)}>
          <h2>{this.renderTitle()}</h2>
          <div className={cn(flex, flexCenter)}>
            {this.renderButtons()}
          </div>
        </div>
        <div>
          {!showEdit && <Table
            schedules={schedules}
            onEdit={this.onEdit}
            refresh={this.fetchSchedules}
          />}
          {showEdit && <EditSchedule
            schedule={selectedSchedule}
            back={this.back}
          />}
        </div>
      </div>
    );
  }
}

export default Scheduling;
