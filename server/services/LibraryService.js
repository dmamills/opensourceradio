const fs = require('fs');
const fx = require('mkdir-recursive');
const { resolve } = require('path');
const { promisify } = require('util');
const musicMetadata = require('music-metadata');
const ffmetadata = require("ffmetadata");
const { ROOT_AUDIO_PATH, getFiles, getMetadataForSong, sanitizeFilename } = require('../util');

const removeFile = promisify(fs.unlink);
const copyFile = promisify(fs.copyFile);
const writeMetadata = promisify(ffmetadata.write)

class LibraryService {

  /**
   * Adds folders to the library if needed
   * @param {array<object>} files
   * @param {string} folderName
   */
  add(files, folderName) {
    let audioPath = ROOT_AUDIO_PATH;
    if(folderName) {
      //recursively make folder if needed
      audioPath = `${audioPath}${folderName}/`;
      fx.mkdirSync(audioPath);
    }

    return Promise.all(files.map(file => {
      const { path, name } = file;
      return copyFile(path, `${audioPath}${sanitizeFilename(name)}`);
    }));
  }

  /**
   * Removes a file from the library
   * @param {string} filename to remove
   * @returns Promise<boolean>
   */
  remove(filename) {
    const path = resolve(ROOT_AUDIO_PATH, filename);
    if(!path.startsWith(resolve(ROOT_AUDIO_PATH))) {
      return Promise.reject('Unaccepted path.');
    }

    return removeFile(path)
      .then(() => true)
      .catch(error => {
        console.log('error:', error);
        return false;
      });
  }

  /**
   * gets the library contents with each files metadata, keyed by folder
   * @returns {object<string, array<object>>} library
   */
  load() {
    return getFiles(ROOT_AUDIO_PATH).then(files => {
      return Promise.all(files.map(f => {
        return this.getMetadata(f, false)
          .then(metadata => ({
            file: f,
            metadata
        }));
      })).then(files => {
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
      });
    });
  }

  /**
   * Gets the metadata for library file
   * @param {string} filename
   * @param {boolean} Add the root audio path to the filename
   * @return {Promise<Object>} metadata
   */
  getMetadata(filename, addRoot = true) {
    const filePath = addRoot ? `${ROOT_AUDIO_PATH}/${filename}` : filename;

    return musicMetadata.parseFile(filePath, { duration: true })
      .then(metadata => ({
          artist: metadata.common.artist,
          album: metadata.common.album,
          title: metadata.common.title,
          duration: metadata.format.duration,
        }));
  }

  /**
   * updates the metadata for a library file
   * @param {string} filename
   * @param {object<string,string>} metadata
   * @return Promise<Error|undefined>
   */
  writeMetadata(filename, metadata) {
    return writeMetadata(`${ROOT_AUDIO_PATH}/${filename}`, metadata);
    /*return new Promise((resolve, reject) => {
      ffmetadata.write(`${ROOT_AUDIO_PATH}/${filename}`, metadata, function(err) {
        if (err) reject(err);
        else resolve();
      });
    });*/
  }
}

module.exports = LibraryService;