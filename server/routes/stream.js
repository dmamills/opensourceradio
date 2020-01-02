const express = require('express');
const router = express.Router();
const pm2 = require('pm2');

const { errorHandler, authMiddleware } = require('./middleware');

//TODO: move to ENV
const processInfo = {
  name: 'osr_stream',
  startScript: '/Users/mills/projects/opensourceradio/stream/index.js',
  workingDirectory: '/Users/mills/projects/opensourceradio/stream',
};


const onStatus = (res) => (err, process) => {
  if(err) return res.status(500).json({ err });

  const description = {
    status: process[0].pm2_env.status
  };

  return res.json({ description });
};

router.post('/start', authMiddleware, (req, res) => {
  pm2.start(processInfo.startScript, { name: processInfo.name, cwd: processInfo.workingDirectory }, onStatus(res));
});

router.post('/stop', authMiddleware, (req, res) => {
  pm2.stop('osr_stream', (err) => {
    if(err) res.status(500).json({ err });
    else res.json({ ok: true });
  });
});

router.get('/status', authMiddleware, (req, res) => {
  pm2.describe('osr_stream', onStatus(res));
});

module.exports = router;
