import React, { useState } from 'react';

const DescribeImage = ({ title, imageUrl, wordBank, startPhrase, tasks }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});

  const handleInputChange = (taskId, value) => {
    setUserAnswers({ ...userAnswers, [taskId]: value.trim() });
  };

  const checkAnswers = () => {
    const newResults = {};
    tasks.forEach(task => {
      // Простая проверка на содержание ключевых слов для гибкости
      const userAnswer = (userAnswers[task.id] || "").toLowerCase();
      const correctAnswer = task.correctAnswer.toLowerCase();
      newResults[task.id] = userAnswer.includes(correctAnswer);
    });
    setResults(newResults);
  };

  return (
    <div className="exercise-block">
      <h3>{title}</h3>
      <img src={imageUrl} alt={title} style={{ maxWidth: '100%', border: '1px solid #eee', marginBottom: '10px' }} />
      <p><b>Слова для использования:</b> {wordBank.join(', ')}</p>
      
      <div className="description-tasks">
        <p>{startPhrase}</p>
        {tasks.map((task, index) => {
          const isCorrect = results[task.id];
          const resultStyle = isCorrect === undefined ? {} :
                              isCorrect ? { color: 'green', fontWeight: 'bold' } : { color: 'red', fontWeight: 'bold' };

          return (
            <div key={task.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <span>{index + 1}.</span>
              <input
                type="text"
                placeholder="...?"
                style={{ flex: 1, margin: '0 10px', padding: '5px', border: '1px solid #ccc' }}
                onChange={(e) => handleInputChange(task.id, e.target.value)}
              />
              {results[task.id] !== undefined && (
                <span style={resultStyle}>
                  {isCorrect ? ' ✔' : ` ✖ (Ожидалось: ${task.correctAnswer})`}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <button onClick={checkAnswers} style={{ marginTop: '20px' }}>Проверить</button>
    </div>
  );
};

export default DescribeImage;
