import moment from 'moment';
import { findMetadataForSong, calculateLengthFromDuration, DATE_FORMAT } from '../../utils';
import { updateSchedule, createSchedule, getLibrary } from '../api';

class Schedule {
  constructor({ id, name, description, playlist, start_time, length, dropdown }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.playlist = Array.isArray(playlist) ? playlist : playlist.split(',');
    this.length = length;
    this.dropdown = dropdown;
    this.start_time = start_time;
  }

  toDropdown() {
    return getLibrary().then(() => {
      return Promise.all(this.playlist.map((song, idx) => {
        return findMetadataForSong(song)
          .then(s => ({ label: this.playlist[idx], value: this.playlist[idx], data: s}));
      }));
    });
  }

  isValid() {
    if(this.playlist.length === 0) return false;
    if(this.name === '') return false;
    if(this.description === '') return false;
    return true;
  }

  static defaultSchedule() {
    return new Schedule({
      name: '',
      description: '',
      start_time: moment().startOf('h').add('1', 'h').format(DATE_FORMAT),
      playlist: '',
      dropdown: [],
      length: 0,
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      start_time: this.start_time,
      description: this.description,
      length: this.length,
      playlist: this.dropdown.map(s => s.label).join(','),
      name: this.name,
    };
  }

  duration() {
    return calculateLengthFromDuration(this.dropdown);
  }

  submit() {
    const submitSchedule = this.toJson();
    let submitRequest = submitSchedule.id ? updateSchedule : createSchedule;
    return submitRequest(submitSchedule);
  }
}

export default Schedule;
