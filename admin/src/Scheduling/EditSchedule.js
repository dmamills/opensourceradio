import React from 'react';
import moment from 'moment';
import cn from 'classnames';

import { updateSchedule, createSchedule } from '../api';

import { flex, spaceBetween, alignItemsCenter, p05, heavyText, flex2, ml1, justifyEnd } from '../styles';

const defaultSchedule = {
  name: '',
  description: '',
  start_time: moment().startOf('h').add('1', 'h').format('YYYY-MM-DD HH:mm:ss'),
  playlist: ''
}

class EditSchedule extends React.Component {  
  componentWillMount() {
    let { schedule } = this.props;
    if(!schedule) schedule = { ...defaultSchedule }

    this.setState({
      schedule
    });
  }

  onChange = field => {
    return (e) => {
      this.setState({
        schedule: {
          ...this.state.schedule,
          [field]: e.target.value
        }
      })
    }
  }

  onSubmit = () => {
    const { schedule } = this.state;
    let submitRequest;
    if(schedule.id) {
      submitRequest = updateSchedule(schedule.id, schedule);
    } else {
      submitRequest = createSchedule(schedule);
    }

    submitRequest.then(result => {
      this.props.back();
    }).catch(error => {
      console.log('error', error);
    });
  }

  render() {
    const { schedule } = this.state;
    return (
      <div>
        <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
          <label className={heavyText} htmlFor="name">Name</label>
          <input 
            defaultValue={schedule.name}
            onChange={this.onChange('name')}
            className={cn(flex2, ml1)} type="text"
          />
        </div>
        <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
          <label className={heavyText} htmlFor="description">Description</label>
          <textarea 
            defaultValue={schedule.description}
            onChange={this.onChange('description')} 
            className={cn(flex2, ml1)}
            type="text"
          ></textarea>
        </div>
        <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
          <label className={heavyText} htmlFor="start_time">Start Time</label>
          <input 
            defaultValue={schedule.start_time}
            onChange={this.onChange('start_time')}
            className={cn(flex2, ml1)} type="text"
          />
        </div>
        <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
          <label className={heavyText} htmlFor="length">Length</label>
          <input 
            defaultValue={schedule.length}
            onChange={this.onChange('length')}
            className={cn(flex2, ml1)} type="text"
          />
        </div>
        <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
          <label className={heavyText} htmlFor="playlist">Playlist</label>
          <input 
            defaultValue={schedule.playlist}
            onChange={this.onChange('playlist')}
            className={cn(flex2, ml1)} type="text"
          />
        </div>

        <div className={cn(flex, spaceBetween, justifyEnd, p05)}>
          <button onClick={this.onSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

export default EditSchedule;