import React, { useState } from 'react';
import AudioPlayer from './AudioPlayer'; // 👈 Импортируем

const InlineChoice = ({ title, tasks, onCheck }) => {
  const [userSelections, setUserSelections] = useState({});
  const [results, setResults] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  // ... (логика handleSelect и checkAnswers остается без изменений)
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
    const newResults = {};
    let correctCount = 0;
    tasks.forEach(task => {
        const userChoices = userSelections[task.id] || {};
        const correctAnswers = task.correctOptions;
        const isCorrect = correctAnswers.every((correctAnswer, index) => userChoices[index] === correctAnswer);
        if(isCorrect) correctCount++;
        newResults[task.id] = isCorrect;
    });
    setResults(newResults);
    setIsChecked(true);
    if(onCheck) onCheck({ total: tasks.length, correct: correctCount });
  };

  const renderTask = (task) => {
    // ...
  };

  return (
    <div className="exercise-block">
      <h3>{title}</h3>
      {tasks.map((task, index) => (
        <div key={task.id} className="exercise-task">
          <div className="task-content">
            {`${index + 1}. `}
            {renderTask(task)}
          </div>
          <div className="task-controls">
            {/* 👇 Добавляем кнопку озвучки */}
            <AudioPlayer textToSpeak={task.sentence} />
          </div>
        </div>
      ))}
      <button onClick={checkAnswers} disabled={isChecked} className="check-button">Проверить</button>
    </div>
  );
};

export default InlineChoice;
