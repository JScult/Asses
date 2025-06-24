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

const updatePhrase = function(id, status, callback) {
  const query = 'UPDATE phrases SET status = ? WHERE id = ?';
  connection.query(query, [status, id], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
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

module.exports = {
  getAllPhrases,
  updatePhrase,
  addPhrase,
  translate,
};