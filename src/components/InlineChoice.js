import React, { useState } from 'react';
import AudioPlayer from './AudioPlayer';

const InlineChoice = ({ title, tasks, onCheck }) => {
  const [userSelections, setUserSelections] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const handleSelect = (taskId, choiceIndex, option) => {
    if (isChecked) return;
    setUserSelections(prev => ({
      ...prev,
      [taskId]: {
        ...(prev[taskId] || {}),
        [choiceIndex]: option,
      },
    }));
  };

  const checkAnswers = () => {
    let correctCount = 0;
    tasks.forEach(task => {
      const userChoices = userSelections[task.id] || {};
      const correctOptions = task.correctOptions;
      if (correctOptions.every((opt, i) => userChoices[i] === opt)) {
        correctCount++;
      }
    });
    setIsChecked(true);
    if (onCheck) {
      onCheck({ total: tasks.length, correct: correctCount });
    }
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
            {options.map((option, optIndex) => {
              const isSelected = userSelections[task.id]?.[currentChoiceIndex] === option;
              let className = 'choice-option';
              if (isSelected) className += ' selected';

              if (isChecked) {
                if (option === task.correctOptions[currentChoiceIndex]) {
                  className += ' correct';
                } else if (isSelected) {
                  className += ' incorrect';
                } else {
                  className += ' disabled';
                }
              }

              return (
                <button
                  key={optIndex}
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

  const renderFeedback = (task) => {
    const parts = task.sentence.split(/(\(.*?\))/g);
    const elements = [];
    let choiceIndex = 0;
    
    parts.forEach((part, index) => {
      const match = part.match(/\((.*?)\)/);
      if (match) {
        elements.push(<strong key={`ans-${index}`} style={{ margin: '0 3px' }}>{task.correctOptions[choiceIndex]}</strong>);
        choiceIndex++;
      } else {
        elements.push(<span key={`text-${index}`}>{part}</span>);
      }
    });
    return elements;
  }

  return (
    <div className="exercise-block">
      <h3>{title}</h3>
      {tasks.map((task, index) => {
        const isCorrect = isChecked && (userSelections[task.id] && task.correctOptions.every((opt, i) => userSelections[task.id][i] === opt));

        return (
          <div key={task.id} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ marginRight: '10px' }}>{`${index + 1}.`}</span>
              {renderTask(task)}
            </div>
            {isChecked && !isCorrect && (
              <div style={{ color: '#28a745', marginTop: '5px', fontSize: '0.9em' }}>
                <strong>Правильный ответ:</strong> {renderFeedback(task)}
              </div>
            )}
          </div>
        );
      })}
      <button onClick={checkAnswers} disabled={isChecked}>Проверить</button>
    </div>
  );
};

export default InlineChoice;
