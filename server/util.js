const fetch = require('node-fetch');
const knex = require('knex')(require('./knexfile').development);

const API_KEY = require('../stream/config.json').api.key;

function getHistory() {
  return knex.select('name', 'message', knex.raw('created_at as timestamp'))
    .from('messages')
    .orderBy('created_at', 'DESC')
    .limit(50);
}

function getSchedules() {
  return knex.select('id','name', 'start_time', 'length')
    .from('schedules')
    .orderBy('start_time');
}

function getPlaylist() {
  const url = `http://localhost:9000/library/audio?include_metadata=true&api_key=${API_KEY}`;
  return fetch(url)
    .then(res => res.json())
    .then(res => res.audio)
    .then(songs => {
      return songs.map(s => {
        const { title, artist } = s.metadata
        return {
          title,
          artist
        }
      });
    });
}

function saveMessage(message) {
  return knex('messages')
    .insert({
      name: message.name,
      created_at: message.timestamp,
      message: message.message
    });
}

module.exports = {
  getHistory,
  getPlaylist,
  saveMessage,
  getSchedules
};
