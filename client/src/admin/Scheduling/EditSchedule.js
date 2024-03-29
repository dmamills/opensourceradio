import React, { useEffect, useState } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import cn from 'classnames';
import AsyncSelect from 'react-select/lib/Async';
import "react-datepicker/dist/react-datepicker.css";

import { formatDate, libraryReduce, DATE_FORMAT, DATE_FORMAT_DP } from '../../utils';
import { getLibrary } from '../api';
import { flex, spaceBetween, p05, flex2, ml1, justifyEnd, textAreaHeight } from '../../styles';
import Label from './Label';
import Preview from './Preview';
import Schedule from './Schedule';
import Button from '../components/Button';

const EditSchedule = (props) => {
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      if(props.schedule) {
        let scheduleModel = new Schedule({...props.schedule});
        try {
        const songs = await scheduleModel.toDropdown();
          scheduleModel.dropdown = songs;
          setSchedule(scheduleModel);

        } catch(err) {
          console.log(err);
          alert('Something is wrong with this schedule. Aborting!');
          props.back();
        }
      } else {
        setSchedule(Schedule.defaultSchedule());
      }
    }

    fetchSchedule();
  }, [props.schedule]);

  const onChange = (field) => {
    return (e) => {
      const updatedSchedule = { ...schedule };
      updatedSchedule[field] = e.target.value;
      setSchedule(new Schedule(updatedSchedule));
    }
  }

  const onShuffleChange = () => {
    const updatedSchedule = { ...schedule, shuffle: !schedule.shuffle };
      setSchedule(new Schedule(updatedSchedule));
  }

  const onSubmit = async () => {
    if(!schedule.isValid()) return;
    try {
      await schedule.submit();
      props.back();
    } catch (err) {
      console.log('error', err);
    }
  }

  const fetchLibrary = input => {
    return getLibrary()
      .then(libraryReduce)
      .then(songs => songs.filter(s => s.file.toLowerCase().includes(input.toLowerCase())))
      .then(songs => songs.map(s => ({label: s.file, value: s.file, data: s})))
      .catch(err => {
        console.log('error fetching library', err);
      });
  }

  const onSelectChange = playlist => {
    const updatedSchedule = {...schedule };
    updatedSchedule.dropdown = playlist;
    updatedSchedule.length = schedule.duration();
    setSchedule(new Schedule(updatedSchedule));
  }

  const onDateChange = date => {
    const updatedSchedule = { ...schedule };
    updatedSchedule.start_time = formatDate(date);
    setSchedule(new Schedule(updatedSchedule));
  }

  if(!schedule) return false;

  return (
    <div className={cn(flex)}>
      <div>
        <Preview schedule={schedule} />
      </div>
      <div className={cn(ml1, flex2)}>
        <Label labelName="Name">
          <input
            defaultValue={schedule.name}
            placeholder="name"
            onChange={onChange('name')}
            className={cn(flex2, ml1)}
            type="text"
          />
        </Label>
        <Label labelName="Description">
          <textarea
            defaultValue={schedule.description}
            onChange={onChange('description')}
            className={cn(flex2, ml1, textAreaHeight)}
            placeholder="Description"
            type="text"
          ></textarea>
        </Label>
        <Label labelName="Start Time">
          <DatePicker
            selected={moment(schedule.start_time, DATE_FORMAT).toDate()}
            onChange={onDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat={DATE_FORMAT_DP}
            timeCaption="time"
            className={cn(flex2, ml1)}
            id="start_time"
          />
        </Label>
        <Label labelName="Playlist">
          <AsyncSelect
            isMulti
            defaultValue={schedule.dropdown}
            cacheOptions
            id="playlist"
            defaultOptions
            loadOptions={fetchLibrary}
            onChange={onSelectChange}
            className={cn(flex2 , ml1)}
          />
        </Label>

        <Label labelName="Shuffle Playlist" spaceBetween={false}>
          <input
            type="checkbox"
            defaultChecked={schedule.shuffle}
            placeholder="shuffle"
            onChange={onShuffleChange}
            className={cn(ml1)}
          />
        </Label>

        <div className={cn(flex, spaceBetween, justifyEnd, p05)}>
          <Button
            disabled={!schedule.isValid()}
            onClick={onSubmit}
            text="Submit"
          />
        </div>
      </div>
    </div>
  );
};

export default EditSchedule;
