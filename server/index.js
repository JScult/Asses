const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");

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
      const sortedPhrases = phrases.sort((a, b) => new Date(a.next_review_date) - new Date(b.next_review_date));
      res.json(sortedPhrases);
    }
  });
});

app.put('/api/phrases/:id', (req, res) => {
  const { id } = req.params;
  const fields = req.body;

  db.updatePhrase(id, fields, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

app.post("/api/phrases", (req, res) => {
  const { kor, rom, eng } = req.body;

  const newPhrase = {
    kor: kor || null,
    rom: rom || null,
    eng: eng || null,
    status: "Not yet",
  };

  db.addPhrase(newPhrase, (err, addedPhrase) => {
    if (err) {
      console.error("Error adding phrase to database:", err);
      res.status(500).send(err);
    } else {
      res.status(201).json(addedPhrase);
    }
  });
});

app.get('/api/phrases/category/:category', (req, res) => {
  const { category } = req.params;

  db.getPhrasesByCategory(category, (err, phrases) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(phrases);
    }
  });
});


//TODO - add additional route handlers as necessary

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});