import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhraseList = () => {
  const [phrases, setPhrases] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3010/api/phrases')
      .then((response) => {
        console.log('Server response:', response.data); // Debugging log
        setPhrases(response.data);
      })
      .catch((error) => {
        console.error('Error fetching phrases:', error);
      });
  }, []);

  return (
    <div>
      <h1>Phrase List</h1>
      <div className="phrases">
        <div className="phrase-table">
          <div className="phrase-header phrase-row">
            <div className="phrase-data">Korean</div>
            <div className="phrase-data">Romanization</div>
            <div className="phrase-data">English</div>
            <div className="phrase-data">Status</div>
          </div>
          <div className="phrases">
            {phrases.map((phrase) => (
              <div className="phrase-row" key={phrase.id}>
                <div className="phrase-data">{phrase.kor}</div>
                <div className="phrase-data">{phrase.rom}</div>
                <div className="phrase-data">{phrase.eng}</div>
                <div className="phrase-data">{phrase.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhraseList;