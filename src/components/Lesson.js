import React from 'react';

// Импорты всех типов блоков
import TheoryBlock from './TheoryBlock';
import FillInTheBlank from './FillInTheBlank';
import MultipleChoice from './MultipleChoice';
import ClassifyItems from './ClassifyItems';
import InlineChoice from './InlineChoice';
import SentenceBuilder from './SentenceBuilder';
import FillFromBank from './FillFromBank';
import FillInTheBlanksComplex from './FillInTheBlanksComplex';
import DescribeImage from './DescribeImage'; // Добавил, так как он есть на скриншоте

// Карта соответствия типов данных компонентам
const componentMapping = {
  TheoryBlock,
  FillInTheBlank,
  MultipleChoice,
  ClassifyItems,
  InlineChoice,
  SentenceBuilder,
  FillFromBank,
  FillInTheBlanksComplex,
  DescribeImage,
};

const Lesson = ({ lessonData, onBack, onNext, onPrev }) => {
  return (
    <div>
      <header>
        {/* Кнопка "назад" теперь не плавающая, а в потоке */}
        <button onClick={onBack} className="back-button">← К списку уроков</button>
        <h1>{lessonData.title}</h1>
      </header>
      <main>
        {lessonData.components && lessonData.components.map((componentData, index) => {
          const Component = componentMapping[componentData.type];
          if (!Component) {
            return <div key={index}>Неизвестный тип компонента: {componentData.type}</div>;
          }
          return <Component key={index} {...componentData} />;
        })}
      </main>
      <footer className="lesson-footer">
        <button
          onClick={onPrev}
          className="nav-button prev"
          disabled={lessonData.id === 1}
        >
          Предыдущий урок
        </button>
        <button
          onClick={onNext}
          className="nav-button next"
          disabled={lessonData.id === 126}
        >
          Следующий урок
        </button>
      </footer>
    </div>
  );
};

export default Lesson;
