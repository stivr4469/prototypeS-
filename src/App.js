// src/App.js
import React, { useState } from 'react';
import Lesson from './components/Lesson';
import LessonMenu from './components/LessonMenu';
import WelcomeScreen from './components/WelcomeScreen';
import AuthScreen from './components/AuthScreen';
import './App.css';
import './components/AuthScreen.css'; // Импортируем новые стили
import './components/WelcomeScreen.css'; // Импортируем новые стили
import { useProgress } from './hooks/useProgress';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading, login, register, logout } = useAuth();
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [authMode, setAuthMode] = useState(null); // 'login', 'register', или null

  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [currentLessonData, setCurrentLessonData] = useState(null);
  const [isLoadingLesson, setIsLoadingLesson] = useState(false);

  // ID пользователя теперь из нашего хука, а не из Firebase
  const userId = user ? user.id : (isGuestMode ? 'guest' : null);
  const { progress, addXP, updateStreak, saveLessonResult, resetProgress } = useProgress(userId);

  const lessonIds = Array.from({ length: 126 }, (_, i) => `U${i + 1}`);

  const loadLesson = (lessonId) => {
    setIsLoadingLesson(true);
    setCurrentLessonData(null);
    setCurrentLessonId(lessonId);
    import(`./data/${lessonId}.json`)
      .then(module => setCurrentLessonData(module.default))
      .catch(err => {
        console.error("Не удалось загрузить урок:", err);
        alert(`Извините, контент для Урока ${lessonId.match(/(\d+)/)[0]} еще не готов.`);
        setCurrentLessonId(null);
      })
      .finally(() => setIsLoadingLesson(false));
  };

  const handleAuthAction = async (username, password) => {
    const action = authMode === 'login' ? login : register;
    const result = action(username, password);
    if (result.success) {
      setAuthMode(null);
      setIsGuestMode(false);
    } else {
      alert(result.message);
    }
  };

  const handleSignOut = () => {
    logout();
    setIsGuestMode(false);
    setCurrentLessonId(null);
    setCurrentLessonData(null);
  };
  
  const handleReturnToWelcome = () => {
    setAuthMode(null);
    setIsGuestMode(false);
  }

  const handleBackToMenu = () => {
    setCurrentLessonId(null);
    setCurrentLessonData(null);
  };

  const handleNavigation = (direction) => {
    const currentIndex = lessonIds.indexOf(currentLessonId);
    if (currentIndex === -1) return;
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < lessonIds.length) {
      loadLesson(lessonIds[nextIndex]);
    }
  };

  const renderContent = () => {
    if (loading) return <p>Загрузка...</p>;

    if (user || isGuestMode) {
      if (isLoadingLesson) return <p>Загрузка урока...</p>;
      if (currentLessonData) {
        return (
          <Lesson
            lessonData={currentLessonData}
            onBack={handleBackToMenu}
            onNavigate={handleNavigation}
            lessonId={currentLessonId}
            isLastLesson={lessonIds.indexOf(currentLessonId) === lessonIds.length - 1}
            saveLessonResult={saveLessonResult}
            addXP={addXP}
            updateStreak={updateStreak}
          />
        );
      }
      return (
        <LessonMenu
          user={user}
          onSignOut={handleSignOut}
          onSelectLesson={loadLesson}
          lessonIds={lessonIds}
          progress={progress}
          onResetProgress={resetProgress}
        />
      );
    }
    
    if (authMode) {
      return <AuthScreen mode={authMode} onAuth={handleAuthAction} onBack={handleReturnToWelcome} />;
    }

    return <WelcomeScreen onLoginClick={() => setAuthMode('login')} onRegisterClick={() => setAuthMode('register')} onStartAsGuest={() => setIsGuestMode(true)} />;
  };

  return <div className="App">{renderContent()}</div>;
}

export default App;
