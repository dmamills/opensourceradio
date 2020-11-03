require('dotenv').config();
const fs = require('fs');
const moment = require('moment');
const { promisify } = require('util');
const { resolve } = require('path');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const ROOT_AUDIO_PATH = require(`${process.env.STREAM_WORKING_DIR}/config.json`).AUDIO_PATH;
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}

function sanitizeFilename(filename) {
  return filename.replace(/,/g, ' ');
}

const sortByDate = (s1, s2) => moment(s1.start_time, DATE_FORMAT).diff(moment(s2.start_time, DATE_FORMAT));
const ts = () => moment().format(DATE_FORMAT);

const createTimestamps = () => ({
  created_at: ts(),
  updated_at: ts(),
});

const updateTimestamp = () => ({
  updated_at: ts(),
});

const filesToFolders = (files) => {
  return files.reduce((acc, file) => {
    file.file = file.file.replace(`${resolve(ROOT_AUDIO_PATH)}/`, '');

    const idx = file.file.indexOf('/');
    if(idx >= 0) {
      const folder = file.file.substr(0, idx);
      file.file = file.file.substr(idx+1);
      if(!acc[folder]) acc[folder] = [];
      acc[folder].push(file);
    } else {
      acc['/'].push(file);
    }

    return acc;
  }, { '/': []});
}

module.exports = {
  getFiles,
  filesToFolders,
  createTimestamps,
  updateTimestamp,
  sanitizeFilename,
  sortByDate,
  DATE_FORMAT,
  ROOT_AUDIO_PATH,
};
