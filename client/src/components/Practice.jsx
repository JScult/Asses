import React, { useState, useEffect } from "react";
import axios from "axios";

const Practice = () => {
  const [phrases, setPhrases] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3010/api/phrases")
      .then((response) => {
        const allPhrases = response.data;
        const filteredPhrases = allPhrases.filter(
          (phrase) => phrase.status !== "Got it"
        );
        const gotItCount = allPhrases.filter(
          (phrase) => phrase.status === "Got it"
        ).length;
        const percentage =
          allPhrases.length > 0 ? (gotItCount / allPhrases.length ) * 100 : 0;
        setProgressPercentage(percentage);
        const sortedPhrases = filteredPhrases.sort((a, b) => {
          const statusOrder = { "Not yet": 0, "Almost": 1 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
        setPhrases(sortedPhrases);
      })
      .catch((error) => {
        console.error("Error fetching phrases:", error);
      });
  }, []);

  const updateStatus = (status) => {
    axios
      .put(`http://localhost:3010/api/phrases/${phrases[currentIndex].id}`, {
        status: status,
      })
      .then(() => {
        if (status === "Got it") {
          setProgressPercentage((prevPercentage) => {
            const newGotItCount =1+ (prevPercentage / 100) * phrases.length ;
            return (newGotItCount / phrases.length) * 100;
            });
        }
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setShowTranslation(false);
        setShowStatus(false);
      })
      .catch((error) => {
        console.error("Error updating phrase status:", error);
      });
  };

  const toggleTranslation = () => {
    setShowTranslation((prevState) => !prevState);
  };

  const toggleStatus = () => {
    setShowStatus((prevState) => !prevState);
  };

  const currentPhrase = phrases[currentIndex];

  return (
    <div>
      <h1>Practice</h1>
      {currentPhrase && (
        <div className="card">
          <div className="card-index">{currentIndex + 1}</div>
          <div className="card-kor">{currentPhrase.kor}</div>
          <div className="card-rom">{currentPhrase.rom}</div>
          {showTranslation ? (
            <div className="card-eng">{currentPhrase.eng}</div>
          ) : (
            <button className="reveal-button" onClick={toggleTranslation}>
              Reveal Translation
            </button>
          )}
          {showTranslation && (
            <button className="reveal-button" onClick={toggleTranslation}>
              Hide Translation
            </button>
          )}
          <button onClick={() => updateStatus("Not yet")}>Not yet</button>
          <button onClick={() => updateStatus("Almost")}>Almost</button>
          <button onClick={() => updateStatus("Got it")}>Got it</button>
          <button className="status-button" onClick={toggleStatus}>
            {showStatus ? "Hide Status" : "Show Status"}
          </button>
          {showStatus && (
            <div className="card-status">Status: {currentPhrase.status}</div>
          )}
        </div>
      )}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <div className="progress-bar-text">
          {progressPercentage.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default Practice;
