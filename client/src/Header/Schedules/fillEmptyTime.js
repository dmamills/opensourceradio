import moment from 'moment';
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const makeSchedule = (start_time, length) => ({
  id: Date.now(),
  start_time,
  length,
  name: '🔀 opensourceradio on shuffle! 🔀',
  description: 'Everything currently in the opensourceradio vault shuffled up!'
});

const fillEmptyTime = schedules => {

  if(schedules.length === 0) {
    return [
      makeSchedule(
        moment().startOf('day'),
        24
      )
    ]
  }

  let filledSchedule = [];
  schedules.forEach((schedule, idx) => {
    const prev = schedules[idx-1];
    const st = (idx === 0) ? moment().startOf('day') : moment(prev.start_time, DATE_FORMAT).add(prev.length, 'h');
    const et = moment(schedule.start_time, DATE_FORMAT);
    const hours = moment.duration(et.diff(st)).asHours();

    filledSchedule.push(makeSchedule(
      st.format(DATE_FORMAT),
      hours
    ));

    filledSchedule.push(schedule);

    if(idx === schedules.length - 1) {
      const endHours = moment.duration(moment().endOf('day').add('1','m').diff(et)).asHours();
      filledSchedule.push(makeSchedule(
        et.add(schedule.length).format(DATE_FORMAT),
        endHours
      ));
    }
  });

  return filledSchedule;
}

export default fillEmptyTime;