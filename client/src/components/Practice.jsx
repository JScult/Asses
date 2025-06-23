import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Practice = () => {
  const [phrases, setPhrases] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3010/api/phrases')
      .then((response) => {
        setPhrases(response.data);
      })
      .catch((error) => {
        console.error('Error fetching phrases:', error);
      });
  }, []);

  const updateStatus = (status) => {
    axios.put(`http://localhost:3010/api/phrases/${phrases[currentIndex].id}`, {
      status: status
    })
      .then(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      })
      .catch((error) => {
        console.error('Error updating phrase status:', error);
      });
  };

  const currentPhrase = phrases[currentIndex];

  return (
    <div>
      <h1>Practice</h1>
      {currentPhrase && (
        <div className="card">
          <div className="card-kor">{currentPhrase.kor}</div>
          <div className="card-rom">{currentPhrase.rom}</div>
          <div className="card-eng">{currentPhrase.eng}</div>
          <button onClick={() => updateStatus('Not yet')}>Not yet</button>
          <button onClick={() => updateStatus('Almost')}>Almost</button>
          <button onClick={() => updateStatus('Got it')}>Got it</button>
        </div>
      )}
    </div>
  );
};

export default Practice;