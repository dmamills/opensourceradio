import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import stylish from '@dmamills/stylish';
import cn from 'classnames';
import AsyncSelect from 'react-select/lib/Async';
import "react-datepicker/dist/react-datepicker.css";

import { updateSchedule, createSchedule, getLibrary } from '../api';
import { flex, spaceBetween, alignItemsCenter, p05, heavyText, flex2, ml1, justifyEnd } from '../styles';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT_DP = 'YYYY-MM-dd HH:mm:ss';


stylish.raw(`
  .react-datepicker-wrapper { display: flex; flex: 1; cursor: pointer; }
  .react-datepicker__input-container { display: flex !important; flex: 1 !important; }
`);

const defaultSchedule = {
  name: '',
  description: '',
  start_time: moment().startOf('h').add('1', 'h').format(DATE_FORMAT),
  playlist: []
}

class EditSchedule extends React.Component {  
  componentWillMount() {
    let { schedule } = this.props;
    if(!schedule) schedule = { ...defaultSchedule }
    else {
      schedule.playlist = schedule.playlist.split(',').map(s => ({label: s, value: s}));
    }

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
    schedule.playlist = schedule.playlist.map(s => s.label).join(',');
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

  fetchLibrary = input => {
    return getLibrary()
      .then(library => {
        const folders = Object.keys(library);
        return folders.reduce((acc, folder) => {
          acc = acc.concat(library[folder].map(f => {
            if(folder === '/') return `${folder}${f}`
            else return `${folder}/${f}`;
          }));
          return acc;
        }, []);
      })
      .then(songs => songs.filter(s => s.toLowerCase().includes(input.toLowerCase())))
      .then(songs => songs.map(s => ({label: s, value: s})))
      .catch(err => {
        console.log('error fetching library', err);
      })
  }

  onSelectChange = playlist => {
    const { schedule } = this.state;
    schedule.playlist = playlist;
    this.setState({
      playlist
    });
  }

  onDateChange = date => {
    const { schedule } = this.state;
    schedule.start_time = moment(date).format(DATE_FORMAT);
    this.setState({
      schedule,
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
          <DatePicker
            selected={moment(schedule.start_time, DATE_FORMAT).toDate()}
            onChange={this.onDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat={DATE_FORMAT_DP}
            timeCaption="time"
            className={cn(flex2, ml1)}
            id="start_time"
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
          <AsyncSelect
            isMulti
            defaultValue={schedule.playlist}
            cacheOptions
            id="playlist"
            defaultOptions
            loadOptions={this.fetchLibrary}
            onChange={this.onSelectChange}
            className={cn(flex2 , ml1)}
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