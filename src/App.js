import React, { useState } from 'react';
import Lesson from './components/Lesson';
import LessonMenu from './components/LessonMenu';
import './App.css';

function App() {
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lessonData, setLessonData] = useState(null);

  const loadLesson = (lessonId) => {
    setIsLoading(true);
    setLessonData(null); // Сбрасываем старые данные
    import(`./data/U${lessonId}.json`)
      .then(lessonModule => {
        setLessonData(lessonModule.default);
        setCurrentLessonId(lessonId);
      })
      .catch(err => {
        console.error("Не удалось загрузить урок:", err);
        alert(`Извините, контент для Урока ${lessonId} еще не готов.`);
        setCurrentLessonId(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleBackToMenu = () => {
    setCurrentLessonId(null);
    setLessonData(null);
  };

  const handleNextLesson = () => {
    if (currentLessonId && currentLessonId < 126) {
      loadLesson(currentLessonId + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonId && currentLessonId > 1) {
      loadLesson(currentLessonId - 1);
    }
  };

  return (
    <div className="App">
      {isLoading ? (
        <p>Загрузка...</p>
      ) : lessonData ? (
        <Lesson
          lessonData={lessonData}
          onBack={handleBackToMenu}
          onNext={handleNextLesson}
          onPrev={handlePreviousLesson}
        />
      ) : (
        <LessonMenu onSelectLesson={loadLesson} />
      )}
    </div>
  );
}

export default App;
