import React, { useState } from 'react';
// Импорты
import TheoryBlock from './components/TheoryBlock';
import FillInTheBlank from './components/FillInTheBlank';
import MultipleChoice from './components/MultipleChoice';
import ClassifyItems from './components/ClassifyItems';
import InlineChoice from './components/InlineChoice';
// 👇 1. ИМПОРТИРУЕМ НОВЫЙ КОМПОНЕНТ
import SentenceBuilder from './components/SentenceBuilder';
import './App.css';
import FillFromBank from './components/FillFromBank';
import FillInTheBlanksComplex from './components/FillInTheBlanksComplex';




// Обновляем карту
const componentMapping = {
  TheoryBlock,
  FillInTheBlank,
  MultipleChoice,
  ClassifyItems,
  InlineChoice,
  FillFromBank,
  SentenceBuilder,
  FillInTheBlanksComplex,
  
};
// Компонент для отображения одного урока
const LessonView = ({ lessonData, onBack }) => (
  <div>
    <header>
      <button onClick={onBack} style={{ float: 'right' }}>← К списку уроков</button>
      <h1>{lessonData.title}</h1>
    </header>
    <main>
      {/* 👇 Вот здесь добавлена проверка! */}
      {lessonData.components && lessonData.components.map((componentData, index) => {
        const Component = componentMapping[componentData.type];
        if (!Component) {
          return <div key={index}>Неизвестный тип компонента: {componentData.type}</div>;
        }
        return <Component key={index} {...componentData} />;
      })}
    </main>
  </div>
);
// Компонент для меню выбора уроков
const LessonMenu = ({ onSelectLesson }) => {
  // Теперь у нас 14 уроков
  const lessonIds = Array.from({ length: 126 }, (_, i) => i + 1);
  return (
    <div>
      <header>
        <h1>Выберите урок</h1>
      </header>
      <div className="lesson-menu">
        {lessonIds.map(id => (
          <button className="lesson-button" key={id} onClick={() => onSelectLesson(id)}>
            Урок {id}
          </button>
        ))}
      </div>
    </div>
  );
};

// Главный компонент приложения
function App() {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Функция для загрузки данных урока
  const loadLesson = (lessonId) => {
    setIsLoading(true);
    // Динамический импорт позволяет загружать JSON только когда он нужен
    import(`./data/U${lessonId}.json`)
      .then(lessonModule => {
        setCurrentLesson(lessonModule.default);
      })
      .catch(err => {
        console.error("Не удалось загрузить урок:", err);
        alert(`Извините, контент для Урока ${lessonId} еще не готов.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleBackToMenu = () => {
    setCurrentLesson(null);
  };

  return (
    <div className="App">
      {isLoading ? (
        <p>Загрузка...</p>
      ) : currentLesson ? (
        <LessonView lessonData={currentLesson} onBack={handleBackToMenu} />
      ) : (
        <LessonMenu onSelectLesson={loadLesson} />
      )}
    </div>
  );
}

export default App;
