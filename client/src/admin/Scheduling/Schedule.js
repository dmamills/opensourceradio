import moment from 'moment';
import { findMetadataForSong, calculateLengthFromDuration, DATE_FORMAT } from '../../utils';
import { updateSchedule, createSchedule, getLibrary } from '../api';

class Schedule {
  constructor({ id, name, description, playlist, start_time, length, dropdown, shuffle }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.playlist = Array.isArray(playlist) ? playlist : playlist.split(',');
    this.length = length;
    this.dropdown = dropdown;
    this.start_time = start_time;
    this.shuffle = !!shuffle;
  }

  async toDropdown() {
    await getLibrary()
    return  Promise.all(this.playlist.map(async (song, idx) => {
        return findMetadataForSong(song)
          .then(s => ({ label: this.playlist[idx], value: this.playlist[idx], data: s}));
      }));
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
      shuffle: false,
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      start_time: this.start_time,
      description: this.description,
      length: this.length,
      shuffle: this.shuffle,
      playlist: this.dropdown.map(s => s.label).join(','),
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
