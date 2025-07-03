import React, { useState } from 'react';
import Lesson from './components/Lesson';
import LessonMenu from './components/LessonMenu';
import WelcomeScreen from './components/WelcomeScreen';
import './App.css';

// 👇 ИЗМЕНЕНИЕ: Мы используем useProgress из вашего кода
import { useProgress } from './hooks/useProgress';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [currentLessonData, setCurrentLessonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // 👇 ИЗМЕНЕНИЕ: Интегрируем ваш хук для отслеживания прогресса
  const { isCompleted, markAsCompleted, resetProgress } = useProgress();

  // 👇 ИСПРАВЛЕНИЕ: Возвращаем список ID уроков
  const lessonIds = Array.from({ length: 126 }, (_, i) => `U${i + 1}`);

  const loadLesson = (lessonId) => {
    setIsLoading(true);
    setCurrentLessonData(null);
    setCurrentLessonId(lessonId);
    import(`./data/${lessonId}.json`)
      .then(module => {
        setCurrentLessonData(module.default);
        // Отмечаем урок как пройденный при его загрузке
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

  const handleStart = () => {
    setShowWelcome(false);
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
  
  // Логика отображения
  const renderContent = () => {
    if (showWelcome) {
      return <WelcomeScreen onStart={handleStart} />;
    }
    if (isLoading) {
      return <p>Загрузка...</p>;
    }
    if (currentLessonData) {
      return (
        <Lesson
          lessonData={currentLessonData}
          onBack={handleBackToMenu}
          onNavigate={handleNavigation} // Используем единый обработчик
          isLastLesson={lessonIds.indexOf(currentLessonId) === lessonIds.length - 1}
        />
      );
    }
    // 👇 ИСПРАВЛЕНИЕ: Передаем lessonIds и другие нужные пропсы в LessonMenu
    return (
        <LessonMenu
            onSelectLesson={loadLesson}
            lessonIds={lessonIds}
            isCompleted={isCompleted}
            onResetProgress={resetProgress}
        />
    );
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;
