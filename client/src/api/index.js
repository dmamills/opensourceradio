export const SERVER_URL = 'http://localhost:3000';
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
