const fs = require('fs');
const fx = require('mkdir-recursive');
const { resolve } = require('path');
const { promisify } = require('util');
const musicMetadata = require('music-metadata');
const ffmetadata = require("ffmetadata");
const { ROOT_AUDIO_PATH, getFiles, filesToFolders, sanitizeFilename } = require('../util');

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
      audioPath = `${audioPath}${folderName}/`;
      fx.mkdirSync(audioPath);
    }

    if(!files || files.length === 0) return Promise.reject('No files found');
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
  async remove(filename) {
    const path = resolve(ROOT_AUDIO_PATH, filename);
    if(!path.startsWith(resolve(ROOT_AUDIO_PATH))) {
      return Promise.reject('Unaccepted path.');
    }

    try {
      await removeFile(path);
      return true;
    } catch (error) {
      console.log('error:', error);
      return false;
    }
  }

  /**
   * gets the library contents with each files metadata, keyed by folder
   * @returns {object<string, array<object>>} library
   */
  load() {
    return this._loadLibraryWithMetadata()
      .then(filesToFolders);
  }

  /**
   * Gets the metadata for library file
   * @param {string} filename
   * @param {boolean} Add the root audio path to the filename
   * @return {Promise<Object>} metadata
   */
  async getMetadata(filename, addRoot = true) {
    const filePath = addRoot ? `${ROOT_AUDIO_PATH}/${filename}` : filename;

    const metadata = await musicMetadata.parseFile(filePath, { duration: true });
    return ({
      artist: metadata.common.artist,
      album: metadata.common.album,
      title: metadata.common.title,
      duration: metadata.format.duration,
    });
  }

  /**
   * updates the metadata for a library file
   * @param {string} filename
   * @param {object<string,string>} metadata
   * @return Promise<Error|undefined>
   */
  writeMetadata(filename, metadata) {
    return writeMetadata(`${ROOT_AUDIO_PATH}/${filename}`, metadata);
  }

  _loadLibraryWithMetadata() {
    return getFiles(ROOT_AUDIO_PATH).then(files => {
      return Promise.all(files.map(async f => {
        const metadata = await this.getMetadata(f, false);
        return ({
          file: f,
          metadata
        });
      }))
    });
  }
}

module.exports = LibraryService;