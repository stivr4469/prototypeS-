import React, { useState } from 'react';

// 👇 Добавляем пропс onCheck
const MultipleChoice = ({ title, tasks, onCheck }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState({});
  const [isChecked, setIsChecked] = useState(false); // Состояние для отслеживания проверки

  const handleSelect = (taskId, option) => {
    if (isChecked) return; // Блокируем после проверки
    setSelectedAnswers(prev => ({ ...prev, [taskId]: option }));
  };

  const checkAnswers = () => {
    const newResults = {};
    let correctCount = 0; // Счетчик правильных ответов

    tasks.forEach(task => {
      const isCorrect = selectedAnswers[task.id] === task.correctOption;
      newResults[task.id] = isCorrect;
      if (isCorrect) {
        correctCount++;
      }
    });
    setResults(newResults);
    setIsChecked(true);

    // 👇 Сообщаем результат в Lesson.js
    if (onCheck) {
        onCheck({ total: tasks.length, correct: correctCount });
    }
  };

  return (
    <div className="exercise-block">
      <h3>{title}</h3>
      {tasks.map((task, index) => {
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
            {/* Логика отображения обратной связи */}
            {isChecked && (
              <p style={{ color: isCorrect ? '#155724' : '#721c24', fontSize: '0.9em', fontWeight: 'bold' }}>
                {isCorrect ? '✔' : '✖'} {task.feedback || (isCorrect ? 'Правильно!' : `Правильный ответ: ${task.correctOption}`)}
              </p>
            )}
          </div>
        );
      })}
      {/* Кнопка "Проверить" блокируется после нажатия */}
      <button onClick={checkAnswers} disabled={isChecked}>Проверить</button>
    </div>
  );
};

export default MultipleChoice;
