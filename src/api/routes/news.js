const express = require('express');
const newsController = require('../controllers/news');

const router = express.Router();

router.get('/', (req, res) => {
  newsController.getAllNews()
    .then((news) => res.status(200).json(news))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/:newsId', (req, res) => {
  newsController.getSpecificNews(+req.params.newsId, req.method.toLowerCase())
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
    res.status(201).json({ message: 'News saved in DB' });
  })
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/:newsId', (req, res) => {});

router.delete('/:newsId', (req, res) => {
  newsController.getSpecificNews(+req.params.newsId, req.method.toLowerCase())
    .then((index) => {
      if (index >= 0) {
        return newsController.delSpecificNews(index);
      }
      return 'not found';
    })
    .then((result) => {
      if (result === 'not found') {
        return res.status(404).json({ message: 'Specific news not found in DB' });
      }
      res.status(200).json({ message: 'Specific news was deleted from DB' });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
