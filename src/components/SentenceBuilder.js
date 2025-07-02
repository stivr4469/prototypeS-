import React, { useState } from 'react';

const SentenceBuilder = ({ title, tasks }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});

  if (!tasks) {
    return <div>Ошибка: нет заданий для этого упражнения.</div>;
  }

  const handleInputChange = (taskId, value) => {
    setUserAnswers({ ...userAnswers, [taskId]: value });
  };
  
  const checkAnswers = () => {
    const newResults = {};
    tasks.forEach(task => {
      const userAnswer = (userAnswers[task.id] || "").trim().toLowerCase();
      // Для упрощения проверки, мы можем сравнивать только ту часть, которая должна измениться,
      // или все предложение целиком. Пока оставим сравнение всего предложения.
      const correctAnswer = task.correct.trim().toLowerCase();
      newResults[task.id] = userAnswer === correctAnswer;
    });
    setResults(newResults);
  };

  return (
    <div className="exercise-block">
      <h3>{title}</h3>
      {tasks.map((task, index) => {
        const isCorrect = results[task.id];
        const resultStyle = isCorrect === undefined ? {} : 
                            isCorrect ? { color: 'green', fontWeight: 'bold' } : { color: 'red', fontWeight: 'bold' };

        return (
          <div key={task.id} style={{ borderTop: '1px solid #eee', paddingTop: '10px', marginTop: '10px' }}>
            <p>
              <b>{index + 1}. Исходная фраза:</b> 
              <span> {task.prefix}</span>
              <span style={{ backgroundColor: '#fffbe6', borderBottom: '2px solid #fcd34d', padding: '2px 0' }}>
                {task.highlight}
              </span>
              <span>{task.suffix}</span>
            </p>
            <input 
              type="text" 
              placeholder="Введите сюда исправленное предложение..." 
              style={{width: '95%', padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px'}}
              onChange={(e) => handleInputChange(task.id, e.target.value)}
            />
            {results[task.id] !== undefined && (
              <p style={resultStyle}>
                {isCorrect ? '✔ Верно!' : `✖ Неверно. Правильный ответ: ${task.correct}`}
              </p>
            )}
          </div>
        );
      })}
      <button onClick={checkAnswers} style={{marginTop: '20px'}}>Проверить</button>
    </div>
  );
};

export default SentenceBuilder;
