
export const pad = n => n < 10 ? `0${n}` : n;

export const parseTime = (timestamp) => {
  const d = new Date(timestamp);
  let hour = pad(d.getHours() % 12);
  if(hour === '00') hour = '12';
  return `${hour}:${pad(d.getMinutes())}`;
}