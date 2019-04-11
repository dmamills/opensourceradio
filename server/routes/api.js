const express = require('express');
const multipart = require('connect-multiparty');
const router = express.Router();
const { ScheduleRepository, MessageRepository } = require('../repo');
const { loadLibrary, getMetadataForSong, moveFiles } = require('../util');
const { RTMP_HTTP_PASS } = process.env;

const multipartMiddleware = multipart({
  maxFieldsSize: 50 * (1024 * 1024)
});

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

const errorHandler = (error, res) => {
  console.log(error);
  res.status(500).json({
    error
  });
}

router.get('/library', authMiddleware, (req, res) => {
  loadLibrary().then(library => {
    res.json({
      library
    })
  }).catch(error => {
    errorHandler(error, res);
  });
});

router.post('/library', authMiddleware, multipartMiddleware, (req, res) => {
  const files = req.files.file;
  const folderName = req.body.folderName;
  moveFiles(files,folderName)
    .then(() => {
      res.json({ success: true });
    }).catch(error => {
      errorHandler(error, res);
    })
});

router.get('/library/metadata', (req, res) => {
  getMetadataForSong(req.query.file)
    .then(metadata => {
      res.json({ metadata });
    });
})

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
    errorHandler(error, res);
  });
})

router.get('/schedules', authMiddleware, (req, res) => {
  ScheduleRepository.getAll()
    .then(schedules => {
      res.json({
        schedules
      });
    }).catch(error => {
      errorHandler(error, res);
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
    }).catch(error => {
      errorHandler(error, res);
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
    }).catch(error => {
      errorHandler(error, res);
    })
});

router.delete('/schedules/:id', authMiddleware, (req, res) => {
  ScheduleRepository.remove(req.params.id)
    .then(result => {
      res.json({
        result
      });
    }).catch(error => {
      errorHandler(error, res);
    })
})

module.exports = router;