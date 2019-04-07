import React from 'react';
import cn from 'classnames';

import { getSchedules } from '../api';
import Table from './Table'

import { p1, flex, spaceBetween, flexCenter } from '../styles';

class Scheduling extends React.Component {
  state = {
    schedules: []
  }

  fetchSchedules = () => {
    getSchedules()
    .then(schedules => {
      this.setState({
        schedules
      });
    });
  }

  componentDidMount() {
   this.fetchSchedules();
  }

  render() {
    const { schedules } = this.state;
    return (
      <div className={cn(p1)}>
        <div className={cn(flex, spaceBetween)}>
          <h2>Scheduling</h2>
          <div className={cn(flex, flexCenter)}>
            <button>Create New Schedule</button>
            <button onClick={this.fetchSchedules}>Refresh</button>
          </div>
        </div>
        <div>
          <Table
            schedules={schedules}
          />
        </div>
      </div>
    );
  }
}

export default Scheduling;