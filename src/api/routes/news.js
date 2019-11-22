const express = require('express');
const newsController = require('../controllers/news');

const router = express.Router();

router.get('/', (req, res) => {
  newsController.getAllNews()
    .then((news) => res.status(200).json(news))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/:newsId', (req, res) => {
  newsController.getSpecificNews(+req.params.newsId)
    .then((news) => {
      if (news) {
        res.status(200).json(news);
      } else {
        res.status(404).json({ message: 'Specific news not found in DB' });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.post('/', (req, res) => {
  const newNews = {
    author: req.body.author,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
  };

  newsController.saveNews(newNews).then(() => {
    res.status(201).json({
      message: 'News saved in DB',
    });
  })
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/:newsId', (req, res) => {});

router.delete('/:newsId', (req, res) => {});

module.exports = router;
