import { useState, useEffect, useCallback } from 'react';

const PROGRESS_KEY = 'spanishAppProgress';

export const useProgress = () => {
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      return savedProgress ? JSON.parse(savedProgress) : [];
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(completedLessons));
    } catch (error) {
      console.error("Failed to save progress to localStorage", error);
    }
  }, [completedLessons]);

  const markAsCompleted = useCallback((lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
  }, [completedLessons]);

  const isCompleted = useCallback((lessonId) => {
    return completedLessons.includes(lessonId);
  }, [completedLessons]);

  // 👇 НОВАЯ ФУНКЦИЯ ДЛЯ СБРОСА
  const resetProgress = useCallback(() => {
    if (window.confirm("Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя будет отменить.")) {
      setCompletedLessons([]);
    }
  }, []);

  return { markAsCompleted, isCompleted, resetProgress };
};
