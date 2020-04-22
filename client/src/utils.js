import moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT_DP = 'yyyy-MM-dd HH:mm:ss';

export const pad = n => n < 10 ? `0${n}` : n;

export const makeDefaultSchedule = () => ({
  name: '',
  description: '',
  start_time: moment().startOf('h').add('1', 'h').format(DATE_FORMAT),
  playlist: []
});

export const parseTime = (timestamp) => {
  const d = new Date(timestamp);
  let hour = pad(d.getHours() % 12);
  if(hour === '00') hour = '12';
  return `${hour}:${pad(d.getMinutes())}`;
};

export const libraryReduce = (library) => {
  const folders = Object.keys(library);
  return folders.reduce((acc, folder) => {
    acc = acc.concat(library[folder].map(f => {
      if(folder === '/') {
        f.file = `${folder}${f.file}`;
        return f;
      }
      else {
        f.file = `${folder}/${f.file}`;
        return f;
      }
    }));
    return acc;
  }, []);
};

export const durationToHuman = (time) => {
  var minutes = Math.floor(time / 60);
  time -= minutes * 60;

  var seconds = parseInt(time % 60, 10);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2,'0')}`;
};


export const formatDate = timestamp => timestamp ? moment(timestamp).format(DATE_FORMAT) : '';

export const makeDefaultStreamStats = () => ({
  schedule_start_time: null,
  schedule_stop_time: null,
  schedule_playlist: '',
});
