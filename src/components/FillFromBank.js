import React, { useState } from 'react';

const FillFromBank = ({ title, wordBank, tasks }) => {
  // Этот компонент для упражнений, где нужно вставить слова из списка
  // Для простоты, мы используем компонент FillInTheBlank, но добавляем банк слов
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});

  if (!tasks || !wordBank) return <div>Ошибка данных.</div>;

  const handleInputChange = (taskId, inputIndex, value) => {
    const currentTaskAnswers = userAnswers[taskId] || [];
    const newTaskAnswers = [...currentTaskAnswers];
    newTaskAnswers[inputIndex] = value.trim().toLowerCase();
    setUserAnswers({ ...userAnswers, [taskId]: newTaskAnswers });
  };

  const checkAnswers = () => {
    const newResults = {};
    tasks.forEach(task => {
      const correct = task.answers.map(a => a.toLowerCase());
      const student = (userAnswers[task.id] || []).map(a => a.toLowerCase());
      newResults[task.id] = JSON.stringify(correct) === JSON.stringify(student);
    });
    setResults(newResults);
  };
  
  const renderSentenceWithInputs = (task) => {
    const parts = task.sentence.split('___');
    return (<div style={{ display: 'flex', alignItems: 'center' }}>{parts.map((part, index) => (
        <React.Fragment key={index}><span>{part}</span>{index < parts.length - 1 && (<input type="text" style={{ width: '150px', margin: '0 5px' }} onChange={(e) => handleInputChange(task.id, index, e.target.value)} />)}</React.Fragment>
    ))}</div>);
  };

  return (
    <div className="exercise-block">
      <h3>{title}</h3>
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {wordBank.nouns.map(word => <span key={word} style={{backgroundColor: '#e9ecef', padding: '2px 6px', borderRadius: '4px'}}>{word}</span>)}
        <div style={{width: '100%', height: 0}}></div>
        {wordBank.adjectives.map(word => <span key={word} style={{backgroundColor: '#e9ecef', padding: '2px 6px', borderRadius: '4px'}}>{word}</span>)}
      </div>

      {tasks.map((task, index) => {
        const isCorrect = results[task.id];
        const resultStyle = isCorrect === undefined ? {} : { color: isCorrect ? 'green' : 'red', fontWeight: 'bold' };
        return (
          <div key={task.id} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px' }}>{index + 1}.</span>
              {renderSentenceWithInputs(task)}
              {results[task.id] !== undefined && <span style={resultStyle}>{isCorrect ? ' ✔' : ` ✖ (Ответ: ${task.answers.join(' ')})`}</span>}
            </div>
          </div>
        );
      })}
      <button onClick={checkAnswers}>Проверить</button>
    </div>
  );
};

export default FillFromBank;
