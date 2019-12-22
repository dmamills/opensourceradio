export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const OSR_KEY = 'osr_admin_key';

export const fetchKey = () => {
  const key = localStorage.getItem(OSR_KEY) || null;
  return key;
}

export const storeKey = key => {
  return localStorage.setItem(OSR_KEY, key);
}

export const getHeaders = () => ({ Authorization: `Bearer ${fetchKey()}` })

const get = url => {
  const headers = getHeaders();
  return fetch(`${SERVER_URL}${url}`, {
    headers
  })
  .then(res => res.json());
}

const post = (url, data) => {
  const headers = getHeaders();
  return fetch(`${SERVER_URL}${url}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  .then(res => res.json());
}

const del = url => {
  const headers = getHeaders();
  return fetch(`${SERVER_URL}${url}`, {
    headers,
    method: 'DELETE'
  })
  .then(res => res.json());

}

export const authTest = key => {
  return fetch(`${SERVER_URL}/api/library`, {
    headers: {
      Authorization: `Bearer ${key}`
    }
  })
  .then(res => res.json())
  .then(({ library }) => !!library);
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

export const updateMetadata = (filename, metadata) => {
  return post('/api/library/metadata', { filename, metadata })
    .then(({ error }) => {
      if(error) throw new Error(error);
      else return true;
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

export const removeSong = (filename) => {
  return del(`/api/library?filename=${filename}`);
}

export const createSchedule = (schedule) => {
  return post(`/api/schedules`, schedule)
  .then(({ error, schedule }) => {
    if(error) throw new Error(error);
    return schedule;
  });
}
