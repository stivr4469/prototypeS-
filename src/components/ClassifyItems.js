import React, { useState } from 'react';

const ClassifyItems = ({ title, columns, items }) => {
  const [assignments, setAssignments] = useState({});
  const [results, setResults] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  if (!items || !columns) {
    return <div>Ошибка: отсутствуют данные для упражнения.</div>;
  }
  
  const handleItemClick = (word) => {
    // Не позволяем выбрать уже распределенное слово
    if (assignments[word]) return;
    setSelectedItem(word);
  };
  
  const handleColumnClick = (columnId) => {
    if (selectedItem) {
      setAssignments({ ...assignments, [selectedItem]: columnId });
      setSelectedItem(null);
    }
  };

  const checkAnswers = () => {
    const newResults = {};
    items.forEach(item => {
      newResults[item.word] = assignments[item.word] === item.correctColumn;
    });
    setResults(newResults);
  };

  return (
    <div className="exercise-block">
      <h3>{title}</h3>
      {/* Банк слов */}
      <div className="word-bank" style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px', minHeight: '40px', border: '1px solid #eee', padding: '10px' }}>
        {items.map(item => {
          const isAssigned = !!assignments[item.word];
          const isSelected = selectedItem === item.word;

          return (
            <button 
              key={item.word} 
              onClick={() => handleItemClick(item.word)}
              style={{ 
                border: isSelected ? '2px solid blue' : '1px solid #ccc',
                opacity: isAssigned ? 0.5 : 1,
                cursor: isAssigned ? 'default' : 'pointer'
              }}
              disabled={isAssigned}
            >
              {item.word}
            </button>
          );
        })}
      </div>
      
      {/* Колонки для распределения */}
      <div className="columns" style={{ display: 'flex', justifyContent: 'space-around', gap: '10px' }}>
        {columns.map(col => (
          <div 
            key={col.id} 
            onClick={() => handleColumnClick(col.id)} 
            style={{ border: '2px dashed #ccc', padding: '10px', width: '23%', minHeight: '100px', cursor: 'pointer', backgroundColor: '#f9f9f9' }}
          >
            <h4>{col.title}</h4>
            {items.filter(item => assignments[item.word] === col.id).map(item => (
              <div 
                key={item.word}
                style={{
                    padding: '5px', margin: '2px 0', borderRadius: '4px',
                    backgroundColor: '#e9ecef',
                    color: results[item.word] === undefined ? 'black' : results[item.word] ? 'green' : 'red',
                    fontWeight: results[item.word] === undefined ? 'normal' : 'bold'
                }}
              >
                {item.word}
                {/* Показываем правильный ответ при ошибке */}
                {results[item.word] === false && ` (→ ${item.correctColumn})`}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={checkAnswers} style={{ marginTop: '20px' }}>Проверить</button>
    </div>
  );
};

export default ClassifyItems;
