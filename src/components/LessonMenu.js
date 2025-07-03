import React from 'react';

const LessonMenu = ({ onSelectLesson, lessonIds, isCompleted, onResetProgress }) => {
  const getLessonNumber = (id) => (id ? id.match(/U(\d+)/)[1] : '');

  return (
    <div>
      <header className="menu-header">
        <h1>Выберите урок</h1>
        {/* 👇 НОВАЯ КНОПКА СБРОСА */}
        <button onClick={onResetProgress} className="reset-button">
          Сбросить прогресс
        </button>
      </header>
      <div className="lesson-menu">
        {lessonIds.map(id => (
          <button
            key={id}
            className={`lesson-button ${isCompleted(id) ? 'completed' : ''}`}
            onClick={() => onSelectLesson(id)}
          >
            {isCompleted(id) && <span className="completed-check">✔</span>}
            Урок {getLessonNumber(id)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LessonMenu;
