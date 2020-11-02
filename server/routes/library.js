const express = require('express');
const LibraryService = require('../services/LibraryService');

const { errorHandler, multipartMiddleware, authMiddleware } = require('./middleware');
const router = express.Router();

const  libraryService = new LibraryService();

router.get('/', authMiddleware, (req, res) => {
  libraryService.load()
    .then(library => res.json({ library }))
    .catch(errorHandler(res));
});

router.post('/', authMiddleware, multipartMiddleware, (req, res) => {
  const files = req.files.file;
  const folderName = req.body.folderName;

  libraryService.add(files, folderName)
    .then(() => res.json({ success: true }))
    .catch(errorHandler(res));
});

router.delete('/', authMiddleware, (req, res) => {
  const filename = req.query.filename;

  libraryService.remove(filename)
    .then((success) => res.json({ success }))
    .catch(errorHandler(res));
});

router.get('/metadata', (req, res) => {
  libraryService.getMetadata(req.query.file)
    .then(metadata => res.json({ metadata }))
    .catch(errorHandler(res));
});

router.post('/metadata', (req, res) => {
    const filename = req.body.filename;
    const metadata = req.body.metadata;

    libraryService.writeMetadata(filename, metadata)
      .then(() => res.json({ success: true }))
      .catch(errorHandler(res));
});


module.exports = router;
