import React from 'react';
import stylish from '@dmamills/stylish';
import cn from 'classnames';

import { getSchedules } from '../api';

import { p1, flex, spaceBetween, flexCenter, width100, justifyEnd } from '../styles';

const [ table, tableHeader, tableBody ] = stylish({
  borderCollapse: 'collapse',
}, {
  backgroundColor: 'black',
  color: 'white',
  padding: '1rem',
  ' > th': {
    padding: '1rem',
    textAlign: 'left',
  },
}, {
  color: 'black',
  ':nth-child(odd)': {
    backgroundColor: 'lightgrey'
  },
  ':nth-child(even)': {
    backgroundColor: '#eee'
  },
  ' > td': {
    padding: '1rem'
  }
});

const Row = ({ schedule }) => {
  return (<tr className={cn(tableBody, p1)}>
    <td>{schedule.id}</td>
    <td>{schedule.name}</td>
    <td>{schedule.description}</td>
    <td>{schedule.start_time}</td>
    <td>{schedule.length} hour{schedule.length > 1 ? 's' : ''}</td>
    <td className={cn(flex, justifyEnd)}>
      <button>Edit</button>
      <button>Delete</button>
    </td>
  </tr>)
}

const Table = ({ schedules }) => {
  return (<table className={cn(width100, table)}>
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
  </table>)
}


class Scheduling extends React.Component {
  state = {
    schedules: []
  }

  componentDidMount() {
    getSchedules()
    .then(schedules => {
      this.setState({
        schedules
      })
    })
  }

  render() {
    const { schedules } = this.state;
    return (
      <div className={cn(p1)}>
        <div className={cn(flex, spaceBetween)}>
          <h2>Scheduling</h2>
          <div className={cn(flex, flexCenter)}>
            <button>Create New Schedule</button>
          </div>
        </div>
        <div>
          <Table schedules={schedules}/>
        </div>
      </div>
    )
  }
}

export default Scheduling;