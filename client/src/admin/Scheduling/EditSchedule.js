import React, { useEffect, useState } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import cn from 'classnames';
import AsyncSelect from 'react-select/lib/Async';
import "react-datepicker/dist/react-datepicker.css";

import { getPlaylistDuration, calculateLengthFromDuration, durationToHuman, libraryReduce, makeDefaultSchedule, DATE_FORMAT, DATE_FORMAT_DP } from '../../utils';
import { updateSchedule, createSchedule, getLibrary } from '../api';
import { flex, spaceBetween, p05, flex2, ml1, justifyEnd } from '../../styles';
import Label from './Label';

const findMetadataForSong = (filename) => {
  const parts = filename.split('/');
  return getLibrary().then(lib => {
    if(filename[0] === '/') return lib['/'].find(f => f.file === parts[1]);
    return lib[parts[0]].find(f => f.file === parts[1]);
  });
}

const EditSchedule = (props) => {
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    if(props.schedule) {
      let newSchedule = { ...props.schedule };
      const splitPlaylist = newSchedule.playlist.split(',');
      Promise.all(splitPlaylist.map((song, idx) => {
        return findMetadataForSong(song).then(s => ({ label: splitPlaylist[idx], value: splitPlaylist[idx], data: s}));
      })).then(songs => {
        newSchedule.playlist = songs;
        setSchedule(newSchedule);
      });
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
      });
  }

  const onSelectChange = playlist => {
    const updatedSchedule = {...schedule };
    updatedSchedule.playlist = playlist;
    updatedSchedule.length = calculateLengthFromDuration(playlist);
    setSchedule(updatedSchedule);
  }

  const onDateChange = date => {
    const updatedSchedule = {...schedule };
    updatedSchedule.start_time = moment(date).format(DATE_FORMAT);
    setSchedule(updatedSchedule);
  }

  if(!schedule) return false;

  return (
    <div>
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
      <Label labelName="Schedule Length">
        <span className={cn(flex2, ml1)}>{durationToHuman(getPlaylistDuration(schedule.playlist))}</span>
        <input
          disabled
          value={schedule.length}
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
