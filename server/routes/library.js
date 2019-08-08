const express = require('express');

const { loadLibrary, writeMetadataForSong, getMetadataForSong, removeSong, moveFiles } = require('../util');
const { errorHandler, multipartMiddleware, authMiddleware } = require('./middleware');
const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  loadLibrary().then(library => {
    res.json({
      library
    });
  }).catch(errorHandler(res));
});

router.post('/', authMiddleware, multipartMiddleware, (req, res) => {
  const files = req.files.file;
  const folderName = req.body.folderName;
  moveFiles(files,folderName)
    .then(() => {
      res.json({ success: true });
    }).catch(errorHandler(res));
});

router.delete('/', authMiddleware, (req, res) => {
  const filename = req.query.filename;
  removeSong(filename)
    .then((success) => {
      res.json({ success });
    }).catch(errorHandler(res));
});

router.get('/metadata', (req, res) => {
  getMetadataForSong(req.query.file)
    .then(metadata => {
      res.json({ metadata });
    }).catch(errorHandler(res));
});

router.post('/metadata', (req, res) => {
    const filename = req.body.filename;
    const metadata = req.body.metadata;

    writeMetadataForSong(filename, metadata)
      .then(() => {
        res.json({ success: true })
      })
      .catch(errorHandler(res));
});


module.exports = router;