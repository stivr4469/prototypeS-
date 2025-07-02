import React, { useState } from 'react';

const FillInTheBlanksComplex = ({ title, tasks }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});

  const handleInputChange = (taskId, inputIndex, value) => {
    // Не даем менять ответ после проверки
    if (results[taskId] !== undefined) return;

    const currentTaskAnswers = userAnswers[taskId] || [];
    const newTaskAnswers = [...currentTaskAnswers];
    newTaskAnswers[inputIndex] = value.trim();
    setUserAnswers({ ...userAnswers, [taskId]: newTaskAnswers });
  };

  const checkAnswers = () => {
    const newResults = {};
    tasks.forEach(task => {
      const taskUserAnswers = userAnswers[task.id] || [];
      const correctAnswers = task.answers;
      let isCorrect = true;
      if (taskUserAnswers.length !== correctAnswers.length) {
        isCorrect = false;
      } else {
        for (let i = 0; i < correctAnswers.length; i++) {
          if ((taskUserAnswers[i] || '').toLowerCase() !== correctAnswers[i].toLowerCase()) {
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
    const parts = task.sentence.split('___');
    const elements = [];
    const isChecked = results[task.id] !== undefined;

    parts.forEach((part, index) => {
      elements.push(<span key={`text-${index}`} dangerouslySetInnerHTML={{ __html: part }} />);
      
      if (index < parts.length - 1) {
        const inputId = `input-${task.id}-${index}`;
        const userAnswer = (userAnswers[task.id] && userAnswers[task.id][index]) || '';
        const correctAnswer = task.answers[index];
        
        let borderColor = '#ccc';
        if (isChecked) {
          borderColor = userAnswer.toLowerCase() === correctAnswer.toLowerCase() ? 'green' : 'red';
        }

        elements.push(
          <input
            key={inputId}
            type="text"
            style={{ width: '80px', margin: '0 5px', border: `1px solid ${borderColor}`, borderRadius: '4px', padding: '4px' }}
            value={userAnswer}
            readOnly={isChecked} // Блокируем поле после проверки
            onChange={(e) => handleInputChange(task.id, index, e.target.value)}
          />
        );
      }
    });

    // Показываем полный правильный ответ, если была ошибка
    if (isChecked && !results[task.id]) {
      elements.push(<span key={`feedback-${task.id}`} style={{color: 'green', marginLeft: '10px', fontSize: '0.9em' }}>
        Правильно: {task.answers.join(', ')}
      </span>);
    } else if (isChecked && results[task.id]) {
      elements.push(<span key={`feedback-${task.id}`} style={{color: 'green', marginLeft: '10px' }}>✔</span>)
    }

    return elements;
  };

  return (
    <div className="exercise-block">
      <h3>{title}</h3>
      {tasks.map((task, index) => (
        <div key={task.id} style={{ marginBottom: '10px' }}>
          <p>{`${index + 1}. `}{renderTask(task)}</p>
        </div>
      ))}
      <button onClick={checkAnswers}>Проверить</button>
    </div>
  );
};

export default FillInTheBlanksComplex;
