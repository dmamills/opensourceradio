const express = require('express');
const router = express.Router();

const { NewsRepository } = require('../repo');
const { errorHandler, authMiddleware } = require('./middleware');

router.get('/', async (req, res) => {
  try {
    const news = await NewsRepository.getAll();
    return res.json({ news });
  } catch(e) {
    return res.json({
      error: e.message
    });
  }
});

router.post('/', (req, res) => {
  const news = req.body;
  NewsRepository.create(news)
    .then(result => {
      NewsRepository.get(result[0])
        .then(news => res.json({ news }));
    })
    .catch(errorHandler(res));
});

router.delete('/:id', (req, res) => {
  NewsRepository.remove(req.params.id)
  .then(result => res.json({ result }))
  .catch(errorHandler(res));
})

module.exports = router;
