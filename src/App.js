import React, { useState } from 'react';
import Lesson from './components/Lesson';
import LessonMenu from './components/LessonMenu';
import { useProgress } from './hooks/useProgress';
import './App.css';

function App() {
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [currentLessonData, setCurrentLessonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // 👇 Получаем новую функцию из хука
  const { markAsCompleted, isCompleted, resetProgress } = useProgress();

  const lessonIds = Array.from({ length: 126 }, (_, i) => `U${i + 1}`);

  const loadLesson = (lessonId) => {
    setIsLoading(true);
    setCurrentLessonId(lessonId);
    import(`./data/${lessonId}.json`)
      .then(module => {
        setCurrentLessonData(module.default);
        markAsCompleted(lessonId);
      })
      .catch(err => {
        console.error("Не удалось загрузить урок:", err);
        alert(`Извините, контент для Урока ${lessonId.match(/(\d+)/)[0]} еще не готов.`);
        setCurrentLessonId(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleBackToMenu = () => {
    setCurrentLessonId(null);
    setCurrentLessonData(null);
  };

  const handleNavigation = (direction) => {
    const currentIndex = lessonIds.indexOf(currentLessonId);
    if (currentIndex === -1) return;
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < lessonIds.length) {
      const nextLessonId = lessonIds[nextIndex];
      loadLesson(nextLessonId);
    }
  };

  return (
    <div className="App">
      {isLoading ? (
        <p>Загрузка...</p>
      ) : currentLessonData ? (
        <Lesson
          lessonData={currentLessonData}
          onBack={handleBackToMenu}
          onNavigate={handleNavigation}
          lessonId={currentLessonId}
          isLastLesson={lessonIds.indexOf(currentLessonId) === lessonIds.length - 1}
        />
      ) : (
        <LessonMenu
          onSelectLesson={loadLesson}
          lessonIds={lessonIds}
          isCompleted={isCompleted}
          // 👇 Передаем функцию сброса в компонент меню
          onResetProgress={resetProgress}
        />
      )}
    </div>
  );
}

export default App;
