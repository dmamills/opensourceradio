export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const OSR_KEY = 'osr_admin_key';

export const fetchKey = () => {
  const key = localStorage.getItem(OSR_KEY) || null;
  return key;
};

export const storeKey = key => {
  if(!key) return localStorage.removeItem(OSR_KEY);

  return localStorage.setItem(OSR_KEY, key);
};

export const getHeaders = () => ({ Authorization: `Bearer ${fetchKey()}` });

const get = url => {
  const headers = getHeaders();
  return fetch(`${SERVER_URL}${url}`, {
    headers
  })
  .then(res => res.json());
};

const post = (url, data) => {
  const headers = getHeaders();
  return fetch(`${SERVER_URL}${url}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  .then(res => res.json());
};

const del = url => {
  const headers = getHeaders();
  return fetch(`${SERVER_URL}${url}`, {
    headers,
    method: 'DELETE'
  })
  .then(res => res.json());

};

export const authTest = key => {
  return fetch(`${SERVER_URL}/library`, {
    headers: {
      Authorization: `Bearer ${key}`
    }
  })
  .then(res => res.json())
  .then(({ library }) => !!library);
};

let libraryCache = null;
export const getLibrary = (useCache = false) => {
  if(useCache && libraryCache) {
    return Promise.resolve(libraryCache);
  }

  return get('/library')
    .then(({ error, library}) => {
      if(error) throw new Error(error);
      libraryCache = library;
      return library;
    });
};

export const getMetadata = filename => {
  return get(`/library/metadata?file=${filename}`)
    .then(({ error, metadata }) => {
      if(error) throw new Error(error);
      return metadata;
    });
};

export const updateMetadata = (filename, metadata) => {
  return post('/library/metadata', { filename, metadata })
    .then(({ error }) => {
      if(error) throw new Error(error);
      return true;
    });
};

export const getSchedules = () => {
  return get('/schedules')
  .then(({ error, schedules }) => {
    if(error) throw new Error(error);
    return schedules;
  });
};

export const removeSchedule = (id) => {
  return del(`/schedules/${id}`);
};

export const updateSchedule = (schedule) => {
  return post(`/schedules/${schedule.id}`, schedule)
  .then(({ error, schedule }) => {
    if(error) throw new Error(error);
    return schedule;
  });
};

export const removeSong = (filename) => {
  return del(`/library?filename=${filename}`);
};

export const createSchedule = (schedule) => {
  return post(`/schedules`, schedule)
  .then(({ error, schedule }) => {
    if(error) throw new Error(error);
    return schedule;
  });
};

export const getStreamStatus = () => {
  return get('/stream/status').then(res => res.description);
};

export const postStartStream = () => {
  return post('/stream/start').then(res => res.description);
};

export const postStopStream = () => {
  return post('/stream/stop').then(() => getStreamStatus());
};

export const getStreamStats = () => {
  return get('/stream/log').then(res => res.currentLog);
};

export const getNews = () => {
  return get('/news').then(res => res.news);
}

export const postNews = (news) => {
  return post('/news', news).then(res => res.news);
}

export const deleteNews = (id) => {
  return del(`/news/${id}`);
}