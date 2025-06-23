const mysql = require('mysql');
const mysqlConfig = require('./config.js');

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

module.exports = {
  getAllPhrases,
  updatePhrase
};