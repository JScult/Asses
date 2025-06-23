const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database-mysql');

const app = express();
const PORT = 3010;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// UNCOMMENT TO START
app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/phrases', (req, res) => {
  db.getAllPhrases((err, phrases) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(phrases);
    }
  });
});

app.put('/api/phrases/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.updatePhrase(id, status, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

//TODO - add additional route handlers as necessary

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});