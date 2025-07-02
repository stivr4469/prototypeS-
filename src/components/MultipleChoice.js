import React, { useState } from 'react';

const MultipleChoice = ({ title, tasks }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState({});

  const handleSelect = (taskId, option) => {
    // Не даем менять ответ после проверки
    if (results[taskId] === undefined) {
      setSelectedAnswers({ ...selectedAnswers, [taskId]: option });
    }
  };

  const checkAnswers = () => {
    const newResults = {};
    tasks.forEach(task => {
      newResults[task.id] = selectedAnswers[task.id] === task.correctOption;
    });
    setResults(newResults);
  };

  return (
    <div className="exercise-block">
      <h3>{title}</h3>
      {tasks.map(task => {
        const isChecked = results[task.id] !== undefined;
        const isCorrect = results[task.id];

        return (
          <div key={task.id} style={{ marginBottom: '15px' }}>
            <p>{task.sentence}</p>
            <div>
              {task.options.map(option => {
                let style = { padding: '5px 10px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px', cursor: 'pointer' };
                if (selectedAnswers[task.id] === option) {
                  style.backgroundColor = '#e0e0e0';
                }
                if (isChecked) {
                    style.cursor = 'default';
                    if (option === task.correctOption) {
                        style.backgroundColor = '#d4edda'; // green
                        style.borderColor = '#c3e6cb';
                    } else if (selectedAnswers[task.id] === option && !isCorrect) {
                        style.backgroundColor = '#f8d7da'; // red
                        style.borderColor = '#f5c6cb';
                    }
                }
                
                return (
                  <span key={option} style={style} onClick={() => handleSelect(task.id, option)}>
                    {option}
                  </span>
                );
              })}
            </div>
            {isChecked && !isCorrect && (
                <p style={{ color: 'green', fontSize: '0.9em', marginTop: '5px' }}>
                    Правильный ответ: {task.correctOption}. {task.feedback || ''}
                </p>
            )}
          </div>
        );
      })}
      <button onClick={checkAnswers}>Проверить</button>
    </div>
  );
};

export default MultipleChoice;
