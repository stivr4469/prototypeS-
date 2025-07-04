import { useState, useEffect, useCallback } from 'react';

const PROGRESS_KEY = 'spanishAppProgress_v2';

export const useProgress = () => {
  const [lessonScores, setLessonScores] = useState(() => {
    try {
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      return savedProgress ? JSON.parse(savedProgress) : {};
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(lessonScores));
    } catch (error) {
      console.error("Failed to save progress to localStorage", error);
    }
  }, [lessonScores]);

  const saveLessonResult = useCallback((lessonId, stars) => {
    const currentStars = lessonScores[lessonId] || 0;
    if (stars > currentStars) {
      setLessonScores(prev => ({
        ...prev,
        [lessonId]: stars
      }));
    }
  }, [lessonScores]);

  const getLessonStars = useCallback((lessonId) => {
    return lessonScores[lessonId] || 0;
  }, [lessonScores]);

  const resetProgress = useCallback(() => {
    if (window.confirm("Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя будет отменить.")) {
      setLessonScores({});
    }
  }, []);

  return { saveLessonResult, getLessonStars, resetProgress };
};
