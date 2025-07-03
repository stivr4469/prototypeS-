import React, { useState } from 'react';

const FillInTheBlanksComplex = ({ title, tasks }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});

  const handleInputChange = (taskId, inputIndex, value) => {
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
      let correctCount = 0;
      
      correctAnswers.forEach((answer, index) => {
        if ((taskUserAnswers[index] || '').toLowerCase() === (answer || '').toLowerCase()) {
          correctCount++;
        }
      });
      
      newResults[task.id] = correctCount === correctAnswers.length;
    });
    setResults(newResults);
  };

  const renderTaskWithFeedback = (task) => {
    const parts = task.sentence.split('___');
    const elements = [];
    
    parts.forEach((part, index) => {
      elements.push(<span key={`text-${index}`} dangerouslySetInnerHTML={{ __html: part }} />);
      if (index < parts.length - 1) {
        const correctAnswer = task.answers[index] || '';
        elements.push(<strong key={`answer-${index}`} style={{ color: 'green', margin: '0 5px' }}>{correctAnswer}</strong>);
      }
    });

    return elements;
  };


  const renderTaskInputs = (task) => {
    const parts = task.sentence.split('___');
    const elements = [];
    const isChecked = results[task.id] !== undefined;

    parts.forEach((part, index) => {
      elements.push(<span key={`text-${index}`} dangerouslySetInnerHTML={{ __html: part }} />);
      
      if (index < parts.length - 1) {
        const userAnswer = (userAnswers[task.id] && userAnswers[task.id][index]) || '';
        const correctAnswer = task.answers[index];
        
        let borderColor = '#ccc';
        if (isChecked) {
          borderColor = (userAnswer.toLowerCase() === (correctAnswer || '').toLowerCase()) ? 'green' : 'red';
        }

        elements.push(
          <input
            key={`input-${task.id}-${index}`}
            type="text"
            style={{ width: '120px', margin: '0 5px', border: `2px solid ${borderColor}`, borderRadius: '4px', padding: '4px' }}
            value={userAnswer}
            readOnly={isChecked}
            onChange={(e) => handleInputChange(task.id, index, e.target.value)}
          />
        );
      }
    });
    return elements;
  };

  return (
    <div className="exercise-block">
      <h3>{title}</h3>
      {tasks.map((task, index) => (
        <div key={task.id} style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', minHeight: '30px' }}>
            {`${index + 1}. `}
            {renderTaskInputs(task)}
          </div>
          {results[task.id] === false && (
            <div style={{ color: '#28a745', marginTop: '5px', fontSize: '0.9em', fontWeight: 'bold' }}>
              <span>Правильно: </span>{renderTaskWithFeedback(task)}
            </div>
          )}
        </div>
      ))}
      <button onClick={checkAnswers}>Проверить</button>
    </div>
  );
};

export default FillInTheBlanksComplex;
