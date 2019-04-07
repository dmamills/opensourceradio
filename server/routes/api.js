const express = require('express');
const router = express.Router();
const { getHistory, getTodaysSchedules, getAllSchedules } = require('../util');

const { RTMP_HTTP_PASS } = process.env;

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization || authorization !== `Bearer ${RTMP_HTTP_PASS}`) {
    res.status(401).json({
      error: 'Invalid API KEY'
    });
    return;
  } else {
    next();
  }
}


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

router.get('/todaySchedules', (req, res) => {
  getTodaysSchedules()
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
})

router.get('/schedules', authMiddleware, (req, res) => {
  getAllSchedules()
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