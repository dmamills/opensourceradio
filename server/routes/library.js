const express = require('express');

const { loadLibrary, getMetadataForSong, moveFiles } = require('../util');
const { errorHandler, multipartMiddleware, authMiddleware } = require('./middleware');
const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  loadLibrary().then(library => {
    res.json({
      library
    });
  }).catch(error => {
    errorHandler(error, res);
  });
});

router.post('/', authMiddleware, multipartMiddleware, (req, res) => {
  const files = req.files.file;
  const folderName = req.body.folderName;
  moveFiles(files,folderName)
    .then(() => {
      res.json({ success: true });
    }).catch(error => {
      errorHandler(error, res);
    });
});

router.get('/metadata', (req, res) => {
  getMetadataForSong(req.query.file)
    .then(metadata => {
      res.json({ metadata });
    });
});



module.exports = router;