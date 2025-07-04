import React from 'react';
// Импорты всех ваших компонентов
import TheoryBlock from './TheoryBlock';
import FillInTheBlank from './FillInTheBlank';
import FillInTheBlanksComplex from './FillInTheBlanksComplex';
import MultipleChoice from './MultipleChoice'; // Убедимся, что импорт на месте
import InlineChoice from './InlineChoice';
// И другие ваши компоненты, если есть
import ClassifyItems from './ClassifyItems';
import DescribeImage from './DescribeImage';
import FillFromBank from './FillFromBank';
import SentenceBuilder from './SentenceBuilder';

// 👇 ВОТ ЗДЕСЬ БЫЛА ОШИБКА. Я ВОССТАНОВИЛ ПОЛНЫЙ СПИСОК 👇
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

const Lesson = ({ lessonData, onBack, onNavigate, lessonId, isLastLesson, saveLessonResult }) => {
  const [showResults, setShowResults] = React.useState(false);
  const exerciseResults = React.useRef({});

  const getLessonNumber = (id) => (id ? id.match(/U(\d+)/)[1] : '');

  const handleExerciseCheck = (id, result) => {
    exerciseResults.current[id] = result;
  };

  const calculateFinalScore = () => {
    let totalQuestions = 0;
    let totalCorrect = 0;

    Object.values(exerciseResults.current).forEach(result => {
      totalQuestions += result.total;
      totalCorrect += result.correct;
    });

    if (totalQuestions === 0) return 0;
    const percentage = (totalCorrect / totalQuestions) * 100;

    if (percentage > 80) return 3;
    if (percentage > 40) return 2;
    if (percentage > 0) return 1; // Даем 1 звезду даже за 1 правильный ответ
    return 0; // 0 звезд, если все неправильно
  };

  const finishLesson = () => {
    const stars = calculateFinalScore();
    saveLessonResult(lessonId, stars);
    setShowResults(true); 
    alert(`Урок пройден! Вы заработали ${stars} ${stars === 1 ? 'звезду' : (stars > 1 && stars < 5 ? 'звезды' : 'звезд')}.`);
  };

  const renderComponent = (componentData, index) => {
    const Component = componentMapping[componentData.type];
    if (!Component) {
      return <div key={index} style={{color: 'red', margin: '20px 0'}}><strong>Ошибка:</strong> Неизвестный тип компонента: {componentData.type}</div>;
    }
    // Передаем callback-функцию в каждое упражнение
    return <Component key={index} onCheck={(result) => handleExerciseCheck(`${lessonId}-${index}`, result)} {...componentData} />;
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
        <button className="finish-lesson-button" onClick={finishLesson}>Завершить урок</button>
        <button className="nav-button next" onClick={() => onNavigate('next')} disabled={isLastLesson}>Следующий урок</button>
      </footer>
    </div>
  );
};

export default Lesson;
