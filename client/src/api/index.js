export const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const NAME_KEY = 'OSR_CHAT_NAME';

export function getName() {
  return localStorage.getItem(NAME_KEY);
}

export function setName(name) {
  if(name === null) {
    return localStorage.removeItem(NAME_KEY);
  }

  return localStorage.setItem(NAME_KEY, name);
}

export function getHistory() {
  return fetch(`${SERVER_URL}/history`)
  .then(res => res.json())
  .then(res => res.history);
}

export function getSchedules() {
  return fetch(`${SERVER_URL}/schedules/today`)
  .then(res => res.json())
  .then(res => res.schedules);
}

export function getNews() {
  return fetch(`${SERVER_URL}/news`)
  .then(res => res.json())
  .then(res => res.news);
}
