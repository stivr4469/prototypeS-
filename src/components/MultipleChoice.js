import React, { useState } from 'react';

const MultipleChoice = ({ title, tasks }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState({});

  const handleSelect = (taskId, option) => {
    if (results[taskId] !== undefined) return;
    setSelectedAnswers(prev => ({ ...prev, [taskId]: option }));
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
      {tasks.map((task, index) => {
        const isChecked = results[task.id] !== undefined;
        const isCorrect = results[task.id];

        return (
          <div key={task.id} style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
            <p style={{ fontWeight: 500 }}>{`${index + 1}. ${task.sentence}`}</p>
            <div style={{ marginBottom: '5px' }}>
              {task.options.map(option => {
                const isSelected = selectedAnswers[task.id] === option;
                let className = 'choice-option';
                
                if (isChecked) {
                  if (option === task.correctOption) {
                    className += ' correct';
                  } else if (isSelected) {
                    className += ' incorrect';
                  } else {
                    className += ' disabled';
                  }
                } else if (isSelected) {
                  className += ' selected';
                }

                return (
                  <button
                    key={option}
                    className={className}
                    onClick={() => handleSelect(task.id, option)}
                    disabled={isChecked}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {/* 👇 Новая логика для отображения обратной связи */}
            {isChecked && (
              <p style={{ color: '#155724', fontSize: '0.9em', fontWeight: 'bold' }}>
                {isCorrect ? '✔' : '✖'} {task.feedback}
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
