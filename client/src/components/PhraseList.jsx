import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPhrase from './AddPhrase';

const PhraseList = () => {
  const [phrases, setPhrases] = useState([]);
  const [showAddPhrase, setShowAddPhrase] = useState(false);

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

  const handlePhraseAdded = (newPhrase) => {
    setPhrases([...phrases, newPhrase]);
  };

  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryInput, setCategoryInput] = useState('');

  const handleEditCategoryClick = (id, currentCategory) => {
    setEditingCategoryId(id);
    setCategoryInput(currentCategory || '');
  };

  const handleCategoryInputChange = (e) => {
    setCategoryInput(e.target.value);
  };

  const handleCategorySubmitClick = (id) => {
    handleCategorySubmit(id, categoryInput);
    setEditingCategoryId(null);
    setCategoryInput('');
  };

  const handleCategorySubmit = (id, newCategory) => {
    axios.put(`http://localhost:3010/api/phrases/${id}`, { category: newCategory })
      .then(() => {
        setPhrases(phrases.map(phrase => 
          phrase.id === id ? { ...phrase, category: newCategory } : phrase
        ));
        console.log('Category updated successfully');
      })
      .catch((error) => {
        console.error('Error updating category:', error);
      });
  };

  const handleFieldUpdate = (id, fields) => {
    axios.put(`http://localhost:3010/api/phrases/${id}`, fields)
      .then(() => {
        setPhrases(phrases.map(phrase => 
          phrase.id === id ? { ...phrase, ...fields } : phrase
        ));
        console.log('Fields updated successfully');
      })
      .catch((error) => {
        console.error('Error updating fields:', error);
      });
  };

  return (
    <div>
      <h1>Phrase List</h1>
      <button onClick={() => setShowAddPhrase(true)} className='add-btn'>Add Phrase</button>
      {showAddPhrase && (
        <AddPhrase
          onClose={() => setShowAddPhrase(false)}
          onPhraseAdded={handlePhraseAdded}
        />
      )}
      <div className="phrases">
        <div className="phrase-table">
          <div className="phrase-header phrase-row">
            <div className="phrase-data">Korean</div>
            <div className="phrase-data">Romanization</div>
            <div className="phrase-data">English</div>
            <div className="phrase-data">Status</div>
            <div className="phrase-data">Category</div>
          </div>
          <div className="phrases">
            {phrases.map((phrase) => (
              <div className="phrase-row" key={phrase.id}>
                <div className="phrase-data">{phrase.kor}</div>
                <div className="phrase-data">{phrase.rom}</div>
                <div className="phrase-data">{phrase.eng}</div>
                <div className="phrase-data">{phrase.status}</div>
                <div className="phrase-data">
                  {editingCategoryId === phrase.id ? (
                    <div>
                      <input
                        type="text"
                        value={categoryInput}
                        onChange={handleCategoryInputChange}
                        placeholder="Enter category"
                      />
                      <button
                        className="submit-btn"
                        onClick={() => handleCategorySubmitClick(phrase.id)}
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span>{phrase.category || 'No category'}</span>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditCategoryClick(phrase.id, phrase.category)}
                      >
                        ✏️
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhraseList;