import React, { useState } from 'react';
import { normalizeAnswer } from '../utils/normalization';
import AudioPlayer from './AudioPlayer';

const FillInTheBlank = ({ title, tasks, content, onCheck }) => {
  // ... (весь код до return остается без изменений)
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (taskId, value) => {
    setUserAnswers({ ...userAnswers, [taskId]: value.trim() });
  };
  
  const checkAnswers = () => {
    const newResults = {};
    let correctCount = 0;
    tasks.forEach(task => {
      const normalizedCorrectAnswers = task.answer.toLowerCase().split('/').map(a => normalizeAnswer(a));
      const normalizedUserAnswer = normalizeAnswer(userAnswers[task.id] || "");
      const isCorrect = normalizedCorrectAnswers.includes(normalizedUserAnswer);
      if (isCorrect) correctCount++;
      newResults[task.id] = isCorrect;
    });
    setResults(newResults);
    setIsChecked(true);
    if (onCheck) onCheck({ total: tasks.length, correct: correctCount });
  };

  return (
    <div className="exercise-block">
      <h3 dangerouslySetInnerHTML={{ __html: title }} />
      {content && (
        <div className="word-bank-container">
          {content.map((item, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: item.text }} style={{ margin: 0 }} />
          ))}
        </div>
      )}
      {tasks.map((task, index) => {
        const isCorrect = results[task.id];
        const parts = task.sentence.split('___');

        return (
          <div key={task.id} className="exercise-task">
            <div className="task-content">
              <span dangerouslySetInnerHTML={{ __html: `${index + 1}. ${parts[0]}` }} />
              <input
                type="text"
                className={`input-field ${isChecked ? (isCorrect ? 'correct-border' : 'incorrect-border') : ''}`}
                onChange={(e) => handleInputChange(task.id, e.target.value)}
                readOnly={isChecked}
              />
              {parts[1] && <span dangerouslySetInnerHTML={{ __html: parts[1] }} />}
            </div>
            <div className="task-controls">
              {/* 👇 Передаем специальный текст для озвучки */}
              <AudioPlayer textToSpeak={task.speechText || task.sentence} />
              {isChecked && (
                <span className={`feedback-text ${isCorrect ? 'correct-text' : 'incorrect-text'}`}>
                  {isCorrect ? ' ✔ Правильно!' : ` ✖ Ответ: ${task.answer}`}
                </span>
              )}
            </div>
          </div>
        );
      })}
      <button onClick={checkAnswers} disabled={isChecked} className="check-button">Проверить</button>
    </div>
  );
};

export default FillInTheBlank;
