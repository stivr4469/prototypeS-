import React from 'react';
// Импорты всех ваших компонентов
import TheoryBlock from './TheoryBlock';
import FillInTheBlank from './FillInTheBlank';
import FillInTheBlanksComplex from './FillInTheBlanksComplex';
import MultipleChoice from './MultipleChoice';
import ClassifyItems from './ClassifyItems';
import DescribeImage from './DescribeImage';
import FillFromBank from './FillFromBank';
import InlineChoice from './InlineChoice';
import SentenceBuilder from './SentenceBuilder';

const componentMapping = {
  TheoryBlock,
  FillInTheBlank,
  FillInTheBlanksComplex,
  MultipleChoice,
  ClassifyItems,
  DescribeImage,
  FillFromBank,
  InlineChoice,
  SentenceBuilder,
};

const Lesson = ({ lessonData, onBack, onNavigate, lessonId, isLastLesson }) => {
  // 👇 ИСПРАВЛЕНИЕ: Добавляем проверку, что lessonId существует
  const getLessonNumber = (id) => (id ? id.match(/U(\d+)/)[1] : '');

  const renderComponent = (componentData, index) => {
    const Component = componentMapping[componentData.type];
    if (!Component) {
      return <div key={index}>Неизвестный тип компонента: {componentData.type}</div>;
    }
    return <Component key={index} {...componentData} />;
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
        <button
          className="nav-button prev"
          onClick={() => onNavigate('prev')}
          disabled={getLessonNumber(lessonId) === '1'}
        >
          Предыдущий урок
        </button>
        <button
          className="nav-button next"
          onClick={() => onNavigate('next')}
          disabled={isLastLesson}
        >
          Следующий урок
        </button>
      </footer>
    </div>
  );
};

export default Lesson;
