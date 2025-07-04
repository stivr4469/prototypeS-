import React, { useState } from 'react';
import { normalizeAnswer } from '../utils/normalization'; // 👈 Импортируем нашу функцию

const FillInTheBlanksComplex = ({ title, tasks, onCheck }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (taskId, inputIndex, value) => {
    if (isChecked) return;

    const currentTaskAnswers = userAnswers[taskId] || [];
    const newTaskAnswers = [...currentTaskAnswers];
    newTaskAnswers[inputIndex] = value.trim();
    setUserAnswers({ ...userAnswers, [taskId]: newTaskAnswers });
  };

  const checkAnswers = () => {
    const newResults = {};
    let correctCount = 0;

    tasks.forEach(task => {
      const taskUserAnswers = userAnswers[task.id] || [];
      const correctAnswers = task.answers;
      let allCorrectInTask = true;

      if (taskUserAnswers.length !== correctAnswers.length) {
        allCorrectInTask = false;
      } else {
        for (let i = 0; i < correctAnswers.length; i++) {
          // 👇 Нормализуем оба ответа перед сравнением
          if (normalizeAnswer(taskUserAnswers[i]) !== normalizeAnswer(correctAnswers[i])) {
            allCorrectInTask = false;
            break;
          }
        }
      }
      if (allCorrectInTask) {
        correctCount++;
      }
      newResults[task.id] = allCorrectInTask;
    });

    setResults(newResults);
    setIsChecked(true);

    if (onCheck) {
      onCheck({ total: tasks.length, correct: correctCount });
    }
  };

  const renderTaskWithFeedback = (task) => {
    const parts = task.sentence.split('___');
    const elements = [];
    let choiceIndex = 0;
    
    parts.forEach((part, index) => {
      elements.push(<span key={`text-${index}`} dangerouslySetInnerHTML={{ __html: part }} />);
      if (index < parts.length - 1) {
        const correctAnswer = task.answers[choiceIndex] || '';
        elements.push(<strong key={`answer-${index}`} style={{ color: 'green', margin: '0 5px' }}>{correctAnswer}</strong>);
        choiceIndex++;
      }
    });

    return elements;
  };

  const renderTaskInputs = (task) => {
    const parts = task.sentence.split('___');
    const elements = [];
    let choiceIndex = 0;

    parts.forEach((part, index) => {
      elements.push(<span key={`text-${index}`} dangerouslySetInnerHTML={{ __html: part }} />);
      
      if (index < parts.length - 1) {
        const userAnswer = (userAnswers[task.id] && userAnswers[task.id][choiceIndex]) || '';
        const correctAnswer = task.answers[choiceIndex];
        
        let borderColor = '#ccc';
        if (isChecked) {
          borderColor = (normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer)) ? 'green' : 'red';
        }

        elements.push(
          <input
            key={`input-${task.id}-${index}`}
            type="text"
            style={{ width: '120px', margin: '0 5px', border: `2px solid ${borderColor}`, borderRadius: '4px', padding: '4px' }}
            defaultValue={userAnswer}
            readOnly={isChecked}
            onChange={(e) => handleInputChange(task.id, choiceIndex, e.target.value)}
          />
        );
        choiceIndex++;
      }
    });
    return elements;
  };

  return (
    <div className="exercise-block">
      <h3>{title}</h3>
      {tasks.map((task, index) => {
        const isCorrect = results[task.id];
        return (
          <div key={task.id} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', minHeight: '30px' }}>
              {`${index + 1}. `}
              {renderTaskInputs(task)}
            </div>
            {isChecked && !isCorrect && (
              <div style={{ color: '#28a745', marginTop: '5px', fontSize: '0.9em', fontWeight: 'bold' }}>
                <span>Правильно: </span>{renderTaskWithFeedback(task)}
              </div>
            )}
          </div>
        );
      })}
      <button onClick={checkAnswers} disabled={isChecked}>Проверить</button>
    </div>
  );
};

export default FillInTheBlanksComplex;
