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
  const getHour = (date) => parseInt(moment(date, DATE_FORMAT).format('HH'),10);

  schedules.forEach((schedule, idx) => {

    const previousSchedule = schedules[idx-1] || { start_time: moment().startOf('day').format(DATE_FORMAT), length: 0 };
    const prevStartHour = getHour(previousSchedule.start_time);
    const prevEndHour = prevStartHour + previousSchedule.length;
    const currentStartHour = getHour(schedule.start_time);

    const hourDiff = currentStartHour - prevEndHour;
    if((hourDiff) > 1) {
      filledSchedule.push(makeSchedule(
        moment(previousSchedule.start_time, DATE_FORMAT).add(previousSchedule.length, 'h').format(DATE_FORMAT),
        hourDiff
      ))
    }

    filledSchedule.push(schedule);

    if(idx === schedules.length - 1) {
      filledSchedule.push(makeSchedule(
        moment(schedule.start_time, DATE_FORMAT).add(schedule.length, 'h').format(DATE_FORMAT),
        0
      ));
    }
  });

  return filledSchedule;
}

export default fillEmptyTime;