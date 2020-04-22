import React, { useEffect, useState } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import cn from 'classnames';
import AsyncSelect from 'react-select/lib/Async';
import "react-datepicker/dist/react-datepicker.css";

import { durationToHuman, libraryReduce, makeDefaultSchedule, DATE_FORMAT, DATE_FORMAT_DP } from '../../utils';
import { updateSchedule, createSchedule, getLibrary } from '../api';
import { flex, spaceBetween, p05, flex2, ml1, justifyEnd } from '../../styles';
import Label from './Label';

/* const findMetadataForSong = (filename) => {
 *   return getLibrary().then(lib => {
 *     if(filename[0] === '/') return lib['/']
 *     return lib[filename];
 *   });
 * } */

const EditSchedule = (props) => {
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    if(props.schedule) {
      let newSchedule = { ...props.schedule };
      newSchedule.playlist = props.schedule.playlist.split(',').map(s => ({label: s, value: s}));

      //TODO: find duration of each playlist song from the library
      /* Promise.all(newSchedule.playlist.split(',').map(song => {
       *   return findMetadataForSong(song).then(s => ({ label: s.file, value: s.file, data: s}));
       * })).then(songs => {
       *   console.log('promise all', songs);
       *   newSchedule.playlist = songs;
       *   setSchedule(newSchedule);
       * }); */
    } else {
      setSchedule({...makeDefaultSchedule() });
    }

  }, [props.schedule]);

  const onChange = (field) => {
    return (e) => {
      const updatedSchedule = { ...schedule };
      updatedSchedule[field] = e.target.value;
      setSchedule(updatedSchedule);
    }
  }

  const onSubmit = () => {
    let submitRequest;
    const submitSchedule = { ...schedule };
    submitSchedule.playlist = submitSchedule.playlist.map(s => s.label).join(',');

    submitRequest = submitSchedule.id ? updateSchedule : createSchedule;

    submitRequest(submitSchedule).then(result => {
      props.back();
    }).catch(error => {
      console.log('error', error);
    });
  }

  const fetchLibrary = input => {
    return getLibrary()
      .then(libraryReduce)
      .then(songs => songs.filter(s => s.file.toLowerCase().includes(input.toLowerCase())))
      .then(songs => songs.map(s => ({label: s.file, value: s.file, data: s})))
      .catch(err => {
        console.log('error fetching library', err);
      })
  }

  const onSelectChange = playlist => {
    const updatedSchedule = {...schedule };
    updatedSchedule.playlist = playlist;
    setSchedule(updatedSchedule);
  }

  const onDateChange = date => {
    const updatedSchedule = {...schedule };
    updatedSchedule.start_time = moment(date).format(DATE_FORMAT);
    setSchedule(updatedSchedule);
  }

  const getPlaylistDuration = () => {
    return schedule.playlist.reduce((acc, s) => {
      if(s.data && s.data.metadata.duration) acc += s.data.metadata.duration;
     return acc;
    }, 0);
  }

  if(!schedule) return false;

  return (
    <div>
      <Label labelName="Playlist Running Time">
        <p>{durationToHuman(getPlaylistDuration())}</p>
      </Label>
      <Label labelName="Name">
        <input
          defaultValue={schedule.name}
          onChange={onChange('name')}
          className={cn(flex2, ml1)} type="text"
        />
      </Label>
      <Label labelName="Description">
        <textarea
          defaultValue={schedule.description}
          onChange={onChange('description')}
          className={cn(flex2, ml1)}
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
      <Label labelName="Length">
        <input
          defaultValue={schedule.length}
          onChange={onChange('length')}
          className={cn(flex2, ml1)} type="text"
        />
      </Label>
      <Label labelName="Playlist">
        <AsyncSelect
          isMulti
          defaultValue={schedule.playlist}
          cacheOptions
          id="playlist"
          defaultOptions
          loadOptions={fetchLibrary}
          onChange={onSelectChange}
          className={cn(flex2 , ml1)}
        />
      </Label>

      <div className={cn(flex, spaceBetween, justifyEnd, p05)}>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default EditSchedule;
