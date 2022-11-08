const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const keys = require('./keys.json');

const app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.json());

webpush.setVapidDetails(
  'mailto:test@test.ru',
  keys.publicKey,
  keys.privateKey,
);

app.post('/subscribe', (req, res) => {
  // Get Push Subscription object
  const subscription = req.body;

  console.log(subscription);
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({
    title: "Тестирование web-пушей"
  });

  webpush.sendNotification(subscription, payload).catch((err) => {
    console.log(err);
  })
});


app.listen(5000, () => {
  console.log('Server running on 5000 port');
});
