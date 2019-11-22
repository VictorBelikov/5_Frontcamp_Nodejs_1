const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // .catch((err) => res.status(500).json({ error: err }));
});

router.get('/:newsId', (req, res) => {});

router.post('/', (req, res) => {});

router.put('/:newsId', (req, res) => {});

router.delete('/:newsId', (req, res) => {});

module.exports = router;
