import { useState, useEffect, useCallback } from 'react';

const getInitialState = (userId) => {
  // Если пользователя нет (гость или еще не загрузился), возвращаем пустое состояние
  if (!userId) { 
    return {
      lessonScores: {},
      totalXP: 0,
      streak: { count: 0, lastSessionDate: null },
    };
  }

  try {
    const PROGRESS_KEY = `spanishAppProgress_v3_${userId}`;
    const savedProgress = localStorage.getItem(PROGRESS_KEY);
    if (savedProgress) {
      return JSON.parse(savedProgress);
    }
  } catch (error) {
    console.error("Failed to load progress from localStorage", error);
  }

  // Состояние по умолчанию для нового пользователя
  return {
    lessonScores: {},
    totalXP: 0,
    streak: { count: 0, lastSessionDate: null },
  };
};

export const useProgress = (userId) => {
  const [progress, setProgress] = useState(() => getInitialState(userId));

  // Перезагружаем прогресс при смене пользователя (вход/выход)
  useEffect(() => {
    setProgress(getInitialState(userId));
  }, [userId]);

  // Сохраняем прогресс в localStorage при его изменении, только если есть пользователь
  useEffect(() => {
    if (userId) {
      try {
        const PROGRESS_KEY = `spanishAppProgress_v3_${userId}`;
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
      } catch (error) {
        console.error("Failed to save progress to localStorage", error);
      }
    }
  }, [progress, userId]);

  const addXP = useCallback((points) => {
    setProgress(prev => ({ ...prev, totalXP: prev.totalXP + points }));
  }, []);
  
  const updateStreak = useCallback(() => {
    setProgress(prev => {
      const today = new Date().toDateString();
      const lastSession = prev.streak.lastSessionDate;

      if (lastSession === today) {
        return prev; // Уже занимались сегодня
      }
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const newCount = lastSession === yesterday.toDateString() ? prev.streak.count + 1 : 1;

      return {
        ...prev,
        streak: {
          count: newCount,
          lastSessionDate: today,
        }
      };
    });
  }, []);

  const saveLessonResult = useCallback((lessonId, stars) => {
    setProgress(prev => {
      const currentStars = prev.lessonScores[lessonId] || 0;
      if (stars > currentStars) {
        return {
          ...prev,
          lessonScores: {
            ...prev.lessonScores,
            [lessonId]: stars,
          },
        };
      }
      return prev;
    });
  }, []);

  const getLessonStars = useCallback((lessonId) => {
    return progress.lessonScores[lessonId] || 0;
  }, [progress.lessonScores]);

  const resetProgress = useCallback(() => {
    if (window.confirm("Вы уверены, что хотите сбросить весь прогресс для этого аккаунта? Это действие нельзя будет отменить.")) {
      setProgress({
        lessonScores: {},
        totalXP: 0,
        streak: { count: 0, lastSessionDate: null },
      });
    }
  }, []);

  return { 
    progress, 
    addXP, 
    updateStreak,
    saveLessonResult, 
    getLessonStars, 
    resetProgress 
  };
};
