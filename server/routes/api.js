const express = require('express');
const router = express.Router();
const { getHistory, getPlaylist } = require('../util');

router.get('/history', (req, res) => {
  getHistory()
  .then((history) => {
    history = history.reverse();
    res.json({
      history
    });
  }).catch(error => {
   console.log(error);
    res.json({ history: [] });
  });
});

router.get('/playlist', (req, res) => {
  getPlaylist()
    .then(playlist => {
      res.json({
        playlist
      });
    }).catch(error => {
      res.status(500).json({
        error
      });
    });
});

module.exports = router;