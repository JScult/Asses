import React, { useState } from "react";
import axios from "axios";

const AddPhrase = ({ onClose, onPhraseAdded }) => {
  const [kor, setKor] = useState("");
  const [rom, setRom] = useState("");
  const [eng, setEng] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddPhrase = () => {
    setLoading(true);
    axios
      .post("http://localhost:3010/api/phrases", {
        kor: kor || null,
        rom: rom || null,
        eng: eng || null,
      })
      .then((response) => {
        onPhraseAdded(response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error adding phrase:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="add-phrase-modal">
      <div className="add-phrase-content">
        <h2>Add New Phrase</h2>
        <input
          type="text"
          value={kor}
          onChange={(e) => setKor(e.target.value)}
          placeholder="Enter Korean text..."
        />
        <input
          type="text"
          value={rom}
          onChange={(e) => setRom(e.target.value)}
          placeholder="Enter Romanized text..."
        />
        <input
          type="text"
          value={eng}
          onChange={(e) => setEng(e.target.value)}
          placeholder="Enter English text..."
        />
        <button onClick={handleAddPhrase} disabled={loading}>
          {loading ? "Adding..." : "Add Phrase"}
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddPhrase;
