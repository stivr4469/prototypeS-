import React, { useState } from 'react';

const InlineChoice = ({ title, tasks }) => {
  const [userSelections, setUserSelections] = useState({});
  const [results, setResults] = useState({});

  const handleSelect = (taskId, choiceIndex, option) => {
    if (results[taskId] !== undefined) return; // Блокируем после проверки
    setUserSelections(prev => ({
      ...prev,
      [taskId]: {
        ...(prev[taskId] || {}),
        [choiceIndex]: option
      }
    }));
  };

  const checkAnswers = () => {
    const newResults = {};
    tasks.forEach(task => {
      const userChoices = userSelections[task.id] || {};
      const correctAnswers = task.correctOptions;
      let isCorrect = true;
      if (Object.keys(userChoices).length !== correctAnswers.length) {
        isCorrect = false;
      } else {
        for (let i = 0; i < correctAnswers.length; i++) {
          if (userChoices[i] !== correctAnswers[i]) {
            isCorrect = false;
            break;
          }
        }
      }
      newResults[task.id] = isCorrect;
    });
    setResults(newResults);
  };

  const renderTask = (task) => {
    const parts = task.sentence.split(/(\(.*?\))/g);
    const elements = [];
    let choiceIndex = 0;

    parts.forEach((part, index) => {
      const match = part.match(/\((.*?)\)/);
      if (match) {
        const options = match[1].split('/');
        const currentChoiceIndex = choiceIndex;
        elements.push(
          <span key={`choice-${index}`} className="inline-choice-container">
            {options.map(option => {
              const isSelected = userSelections[task.id]?.[currentChoiceIndex] === option;
              const isChecked = results[task.id] !== undefined;
              
              let className = 'choice-option';
              if (isSelected) className += ' selected';

              if (isChecked) {
                if (option === task.correctOptions[currentChoiceIndex]) {
                  className += ' correct';
                } else if (isSelected) {
                  className += ' incorrect';
                }
              }

              return (
                <button
                  key={option}
                  className={className}
                  onClick={() => handleSelect(task.id, currentChoiceIndex, option)}
                  disabled={isChecked}
                >
                  {option}
                </button>
              );
            })}
          </span>
        );
        choiceIndex++;
      } else {
        elements.push(<span key={`text-${index}`}>{part}</span>);
      }
    });
    return elements;
  };

  return (
    <div className="exercise-block">
      <h3>{title}</h3>
      {tasks.map((task, index) => (
        <div key={task.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ marginRight: '10px' }}>{`${index + 1}.`}</span>
          <div>{renderTask(task)}</div>
        </div>
      ))}
      <button onClick={checkAnswers}>Проверить</button>
    </div>
  );
};

export default InlineChoice;
