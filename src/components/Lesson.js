import React, { useState, useRef, useEffect } from 'react';
// Импорты всех ваших компонентов
import TheoryBlock from './TheoryBlock';
import FillInTheBlank from './FillInTheBlank';
import FillInTheBlanksComplex from './FillInTheBlanksComplex';
import MultipleChoice from './MultipleChoice';
import InlineChoice from './InlineChoice';
import ClassifyItems from './ClassifyItems'; // Убедимся, что все импорты на месте
import DescribeImage from './DescribeImage';
import FillFromBank from './FillFromBank';
import SentenceBuilder from './SentenceBuilder';

// 👇 ВОТ ЗДЕСЬ БЫЛА ОШИБКА. ВОССТАНАВЛИВАЕМ ПОЛНЫЙ СПИСОК 👇
const componentMapping = {
  TheoryBlock,
  FillInTheBlank,
  FillInTheBlanksComplex,
  MultipleChoice,
  InlineChoice,
  ClassifyItems,
  DescribeImage,
  FillFromBank,
  SentenceBuilder,
};

const Lesson = ({ lessonData, onBack, onNavigate, lessonId, isLastLesson, saveLessonResult, addXP, updateStreak }) => {
  const [isFinished, setIsFinished] = useState(false);
  const exerciseResults = useRef({});
  const lessonXP = useRef(0);

  useEffect(() => {
      setIsFinished(false);
      exerciseResults.current = {};
      lessonXP.current = 0;
  }, [lessonId]);

  const getLessonNumber = (id) => (id ? id.match(/U(\d+)/)[1] : '');

  const handleExerciseCheck = (id, result) => {
    exerciseResults.current[id] = result;
    const points = result.correct * 10;
    lessonXP.current += points; 
  };

  const calculateFinalScore = () => {
    let totalQuestions = 0;
    let totalCorrect = 0;

    Object.values(exerciseResults.current).forEach(result => {
      totalQuestions += result.total;
      totalCorrect += result.correct;
    });

    if (totalQuestions === 0) return { stars: 0, bonusXP: 0 };
    
    const percentage = (totalCorrect / totalQuestions) * 100;
    
    if (percentage >= 80) return { stars: 3, bonusXP: 100 };
    if (percentage >= 40) return { stars: 2, bonusXP: 50 };
    if (percentage > 0) return { stars: 1, bonusXP: 10 };
    return { stars: 0, bonusXP: 0 };
  };

  const finishLesson = () => {
    const { stars, bonusXP } = calculateFinalScore();
    const totalEarnedXP = lessonXP.current + bonusXP;

    saveLessonResult(lessonId, stars);
    addXP(totalEarnedXP);
    updateStreak();

    alert(`Урок пройден!\nЗвезды: ${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}\nЗаработано очков: ${totalEarnedXP} XP`);
    setIsFinished(true);
  };

  const renderComponent = (componentData, index) => {
    const Component = componentMapping[componentData.type];
    if (!Component) {
      return <div key={index} style={{color: 'red', margin: '20px 0'}}><strong>Ошибка:</strong> Неизвестный тип компонента: {componentData.type}</div>;
    }
    return <Component key={`${lessonId}-${index}`} onCheck={(result) => handleExerciseCheck(index, result)} {...componentData} />;
  };

  return (
    <div>
      <header className="lesson-header">
        <h1>{lessonData.title}</h1>
        <button onClick={onBack} className="back-button">← К списку уроков</button>
      </header>
      <main>
        {lessonData.components && lessonData.components.map((componentData, index) => renderComponent(componentData, index))}
      </main>
      <footer className="lesson-footer">
        <button className="nav-button prev" onClick={() => onNavigate('prev')} disabled={getLessonNumber(lessonId) === '1'}>Предыдущий урок</button>
        <button className="finish-lesson-button" onClick={finishLesson} disabled={isFinished}>Завершить урок</button>
        <button className="nav-button next" onClick={() => onNavigate('next')} disabled={isLastLesson}>Следующий урок</button>
      </footer>
    </div>
  );
};

export default Lesson;
