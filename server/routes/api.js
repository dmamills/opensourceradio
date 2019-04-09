const express = require('express');
const router = express.Router();
const { ScheduleRepository, MessageRepository } = require('../repo');
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
  MessageRepository.latest()
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
  ScheduleRepository.todays()
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
  ScheduleRepository.getAll()
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

router.post('/schedules', (req, res) => {
  const schedule = req.body;
  ScheduleRepository.create(schedule)
    .then(result => {
      ScheduleRepository.get(result[0])
        .then(schedule => {
          res.json({ schedule });
        });
    }).catch(err => {
      console.log(err);
      res.json({ error: err });
    })
});

router.post('/schedules/:id', (req, res) => {
  const id = req.params.id;
  ScheduleRepository.update(id, req.body)
    .then(result => {
      ScheduleRepository.get(id)
        .then(schedule => {
          res.json({ schedule });
        });
    }).catch(err => {
      console.log(err);
      res.json({ error: err });
    })
});

router.delete('/schedules/:id', authMiddleware, (req, res) => {
  ScheduleRepository.remove(req.params.id)
    .then(result => {
      res.json({
        result
      });
    });
})

module.exports = router;