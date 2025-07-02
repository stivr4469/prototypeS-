import React, { useState } from 'react';

const InlineChoice = ({ title, tasks }) => {
  const [userChoices, setUserChoices] = useState({});
  const [results, setResults] = useState({});

  const handleSelect = (taskId, choice) => {
    setUserChoices({ ...userChoices, [taskId]: choice });
  };

  const checkAnswers = () => {
    const newResults = {};
    tasks.forEach(task => {
      newResults[task.id] = userChoices[task.id] === task.correct;
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
          <div key={task.id} style={{ marginBottom: '10px', lineHeight: '1.8' }}>
            <span>{index + 1}. {task.prefix} </span>
            (
            {task.options.map((option, i) => (
              <span key={option}>
                <span
                  onClick={() => handleSelect(task.id, option)}
                  style={{
                    cursor: 'pointer',
                    padding: '2px 4px',
                    borderRadius: '4px',
                    backgroundColor: userChoices[task.id] === option ? '#cfe2ff' : 'transparent',
                    fontWeight: userChoices[task.id] === option ? 'bold' : 'normal',
                  }}
                >
                  {option === '∅' ? '---' : option}
                </span>
                {i < task.options.length - 1 && ' / '}
              </span>
            ))}
            )
            <span> {task.suffix}</span>
            {results[task.id] !== undefined && (
              <span style={resultStyle}>
                {isCorrect ? ' ✔' : ` ✖ (Правильно: ${task.correct === '∅' ? '---' : task.correct})`}
              </span>
            )}
          </div>
        );
      })}
      <button onClick={checkAnswers}>Проверить</button>
    </div>
  );
};

export default InlineChoice;
