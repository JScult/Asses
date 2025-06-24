const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const axios = require('axios');

const connection = mysql.createConnection(mysqlConfig);
if(!connection) {
  throw new Error('Could not connect to MySQL database');
}else {
  console.log('Connected to MySQL database');
}

const getAllPhrases = function(callback) {
  const query = 'SELECT * FROM phrases';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err); // Log the error
      callback(err, null);
    } else {
      // console.log('Database query results:', results); // Log the results
      callback(null, results);
    }
  });
};

const addPhrase = function(newPhrase, callback) {
  const query = 'INSERT INTO phrases (kor, rom, eng, status) VALUES (?, ?, ?, ?)';
  const values = [newPhrase.kor || null, newPhrase.rom || null, newPhrase.eng || null, newPhrase.status];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error("Error inserting phrase into database:", err);
      callback(err, null);
    } else {
      callback(null, { id: results.insertId, ...newPhrase });
    }
  });
};

const translate = async function(text, language) {
  try {
    let translations;
    if (language === "english") {
      // Translate English to Korean and Romanized Korean
      translations = await axios.post("https://translation-api.example.com/translate", {
        source: "en",
        target: ["ko", "romanized-ko"],
        text,
      });
    } else if (language === "korean") {
      // Translate Korean to English and Romanized Korean
      translations = await axios.post("https://translation-api.example.com/translate", {
        source: "ko",
        target: ["en", "romanized-ko"],
        text,
      });
    }

    return {
      kor: translations.data.korean,
      rom: translations.data.romanized,
      eng: translations.data.english,
    };
  } catch (error) {
    console.error("Error translating phrase:", error);
    throw error;
  }
};

const updatePhraseWithReviewDate = function(id, status, nextReviewDate, callback) {
  const query = 'UPDATE phrases SET status = ?, next_review_date = ? WHERE id = ?';
  connection.query(query, [status, nextReviewDate, id], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

const calculateNextReviewDate = function(currentDate, quality) {
  // SM2 algorithm logic
  let interval = 1; // Default interval for first review
  if (quality >= 3) {
    interval = Math.pow(2, quality - 2); // Increase interval based on quality
  }
  const nextReviewDate = new Date(currentDate);
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);
  return nextReviewDate;
};

const getPhrasesByCategory = function(category, callback) {
  const query = 'SELECT * FROM phrases WHERE category = ?';
  connection.query(query, [category], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const updatePhraseCategory = function(id, category, callback) {
  const query = 'UPDATE phrases SET category = ? WHERE id = ?';
  connection.query(query, [category, id], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

const updatePhrase = function(id, fields, callback) {
  const setClause = Object.keys(fields).map(field => `${field} = ?`).join(', ');
  const values = [...Object.values(fields), id];
  const query = `UPDATE phrases SET ${setClause} WHERE id = ?`;

  connection.query(query, values, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

module.exports = {
  getAllPhrases,
  updatePhrase,
  addPhrase,
  translate,
  updatePhraseWithReviewDate,
  calculateNextReviewDate,
  getPhrasesByCategory,
  updatePhraseCategory,
};