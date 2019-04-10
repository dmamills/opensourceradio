const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const API_KEY = process.env.REACT_APP_API_TOKEN;

const headers = {
  Authorization: `Bearer ${API_KEY}`
}

const get = url => {
  return fetch(`${SERVER_URL}${url}`, {
    headers
  })
  .then(res => res.json());
}

const post = (url, data) => {
  return fetch(`${SERVER_URL}${url}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  .then(res => res.json());
}

const del = url => {
  return fetch(`${SERVER_URL}${url}`, {
    headers,
    method: 'DELETE'
  })
  .then(res => res.json());
}

export const getLibrary = () => {
  return get('/api/library')
    .then(({ error, library}) => {
      if(error) throw new Error(error);
      if(library) return library;
    });
}

export const getMetadata = filename => {
  return get(`/api/library/metadata?file=${filename}`)
    .then(({ error, metadata }) => {
      if(error) throw new Error(error);
      if(metadata) return metadata;
    })
}

export const getSchedules = () => {
  return get('/api/schedules')
  .then(({ error, schedules }) => {
    if(error) throw new Error(error);
    if(schedules) return schedules;
  });
}

export const removeSchedule = (id) => {
  return del(`/api/schedules/${id}`);
}

export const updateSchedule = (id, schedule) => {
  return post(`/api/schedules/${id}`, schedule)
  .then(({ error, schedule }) => {
    if(error) throw new Error(error);
    return schedule;
  });
}

export const createSchedule =(schedule) => {
  return post(`/api/schedules`, schedule)
  .then(({ error, schedule }) => {
    if(error) throw new Error(error);
    return schedule;
  });
}