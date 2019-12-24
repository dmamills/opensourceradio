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

router.get('/start', (req, res) => {
  pm2.start(processInfo.startScript, { name: processInfo.name, cwd: processInfo.workingDirectory }, (err, proc) => {
    if(err) return res.status(500).json({ err });
    const result = {
        status: proc[0].pm2_env.status
    };

    return res.json({ description: result });
  });
});

router.get('/stop', (req, res) => {
  pm2.stop('osr_stream', (err) => {
    if(err) res.status(500).json({ err });
    else res.json({ ok: true });
  });
});

router.get('/status', (req, res) => {
  pm2.describe('osr_stream', (err, description) => {
    if(err) return res.status(500).json({ err });

    const result = {
        status: description[0].pm2_env.status
    };

    return res.json({ description: result });
  });
});

module.exports = router;
