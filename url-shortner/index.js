const express = require('express');
const router = express.Router();
const Url = require('../models/url');

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

router.post('/shorten', async (req, res) => {
  const originalUrl = req.body.url;
  const url = new Url({ originalUrl });
  await url.save();
  res.send(url.shortUrl);
});

router.get('/:shortUrl', async (req, res) => {
  const shortUrl = req.params.shortUrl;
  const url = await Url.findOne({ shortUrl });
  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

module.exports = router;
