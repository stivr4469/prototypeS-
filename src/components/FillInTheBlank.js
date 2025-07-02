import React, { useState } from 'react';

const FillInTheBlank = ({ title, tasks, content }) => { // Добавляем 'content' в props
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});

  const handleInputChange = (taskId, value) => {
    setUserAnswers({ ...userAnswers, [taskId]: value.trim() });
  };

  const checkAnswers = () => {
    const newResults = {};
    tasks.forEach(task => {
      // Сравнение без учета регистра, разделение ответов через /
      const correctAnswers = task.answer.toLowerCase().split('/').map(a => a.trim());
      const userAnswer = (userAnswers[task.id] || "").toLowerCase().trim();
      newResults[task.id] = correctAnswers.includes(userAnswer);
    });
    setResults(newResults);
  };

  return (
    <div className="exercise-block">
      <h3 dangerouslySetInnerHTML={{ __html: title }} />
      
      {/* Новый блок для отображения контекста/слов */}
      {content && (
        <div style={{ padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '5px', marginBottom: '15px' }}>
          {content.map((item, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: item.text }} style={{ margin: 0 }} />
          ))}
        </div>
      )}

      {tasks.map((task, index) => {
        const isCorrect = results[task.id];
        const resultStyle = isCorrect === undefined ? {} : 
                            isCorrect ? { color: 'green', fontWeight: 'bold' } : { color: 'red', fontWeight: 'bold' };
        
        const parts = task.sentence.split('___');

        return (
          <div key={task.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ marginRight: '5px' }} dangerouslySetInnerHTML={{ __html: `${index + 1}. ${parts[0]}` }} />
            <input
              type="text"
              style={{ width: '250px', margin: '0 5px', border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }}
              onChange={(e) => handleInputChange(task.id, e.target.value)}
            />
            {parts[1] && <span dangerouslySetInnerHTML={{ __html: parts[1] }} />}
            {results[task.id] !== undefined && (
              <span style={{ marginLeft: '10px', ...resultStyle }}>
                {isCorrect ? ' ✔ Правильно!' : ` ✖ Неверно. Ответ: ${task.answer}`}
              </span>
            )}
          </div>
        );
      })}
      <button onClick={checkAnswers}>Проверить</button>
    </div>
  );
};

export default FillInTheBlank;
