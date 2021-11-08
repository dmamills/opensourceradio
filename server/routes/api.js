const express = require('express');
const router = express.Router();

const { MessageRepository } = require('../repo');
const libraryRouter = require('./library');
const schedulesRouter = require('./schedules');
const streamRouter = require('./stream');
const newsRouter = require('./news');

router.use('/library', libraryRouter);
router.use('/schedules', schedulesRouter);
router.use('/stream', streamRouter);
router.use('/news', newsRouter);

router.get('/history', async (req, res) => {
  try {
    const history = await MessageRepository.latest()
    res.json({
      history
    });
  } catch(err) {
    res.json({ history: [] });
  }
});

module.exports = router;
