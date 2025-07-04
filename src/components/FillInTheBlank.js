import React, { useState } from 'react';
import { normalizeAnswer } from '../utils/normalization'; // 👈 Импортируем нашу функцию

const FillInTheBlank = ({ title, tasks, content, onCheck }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (taskId, value) => {
    setUserAnswers({ ...userAnswers, [taskId]: value });
  };

  const checkAnswers = () => {
    const newResults = {};
    let correctCount = 0;

    tasks.forEach(task => {
      // 👇 Нормализуем и правильный ответ, и ответ пользователя
      const normalizedCorrectAnswers = task.answer.split('/').map(a => normalizeAnswer(a));
      const normalizedUserAnswer = normalizeAnswer(userAnswers[task.id] || "");
      
      const isCorrect = normalizedCorrectAnswers.includes(normalizedUserAnswer);

      if (isCorrect) {
        correctCount++;
      }
      newResults[task.id] = isCorrect;
    });

    setResults(newResults);
    setIsChecked(true);

    if (onCheck) {
      onCheck({ total: tasks.length, correct: correctCount });
    }
  };

  return (
    <div className="exercise-block">
      <h3 dangerouslySetInnerHTML={{ __html: title }} />
      {content && (
        <div style={{ padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '5px', marginBottom: '15px' }}>
          {content.map((item, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: item.text }} style={{ margin: 0 }} />
          ))}
        </div>
      )}
      {tasks.map((task, index) => {
        const isCorrect = results[task.id];
        return (
          <div key={task.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ marginRight: '5px' }} dangerouslySetInnerHTML={{ __html: `${index + 1}. ${task.sentence.split('___')[0]}` }} />
            <input
              type="text"
              style={{ width: '250px', margin: '0 5px', border: `2px solid ${results[task.id] === undefined ? '#ccc' : (isCorrect ? 'green' : 'red')}`, borderRadius: '4px', padding: '4px' }}
              onChange={(e) => handleInputChange(task.id, e.target.value)}
              readOnly={isChecked}
            />
            {task.sentence.split('___')[1] && <span dangerouslySetInnerHTML={{ __html: task.sentence.split('___')[1] }} />}
            {isChecked && (
              <span style={{ marginLeft: '10px', color: isCorrect ? 'green' : 'red', fontWeight: 'bold' }}>
                {isCorrect ? ' ✔ Правильно!' : ` ✖ Неверно. Ответ: ${task.answer}`}
              </span>
            )}
          </div>
        );
      })}
      <button onClick={checkAnswers} disabled={isChecked}>Проверить</button>
    </div>
  );
};

export default FillInTheBlank;
