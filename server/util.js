const musicMetadata = require('music-metadata');
const ROOT_AUDIO_PATH = `${process.cwd()}/../stream/assets/audio/`;

function getMetadataForSongs(songs) {
  return Promise.all(songs.map(audioPath => {
    audioPath = `${ROOT_AUDIO_PATH}${audioPath}`;
    return musicMetadata.parseFile(audioPath, { duration: true })
    .then(metadata => {
      return {
        artist: metadata.common.artist,
        album: metadata.common.album,
        title: metadata.common.title
      };
    });
  })
  );
}

function loadMetadataforSchedules(schedules) {
  return Promise.all(
    schedules.map(schedule => {
      const playlist = schedule.playlist.split(',');
      return getMetadataForSongs(playlist).then(songs => {
        schedule.playlist = songs;
        return schedule;
      })
    })
  )
}

module.exports = {
  loadMetadataforSchedules,
};
