const express = require('express');
const router = express.Router();
const { getHistory, getSchedules } = require('../util');

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

router.get('/schedules', (req, res) => {
  getSchedules()
    .then(schedules => {
      res.json({
        schedules
      });
    }).catch(error => {
      console.log(error);
      res.status(500).json({
        error
      });
    });
});

module.exports = router;