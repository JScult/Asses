import React from 'react';
import sampleData from '../sample_data';

const PhraseList = () => (
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
            {sampleData.map((phrase) => (
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

export default PhraseList;