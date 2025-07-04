import React from 'react';

const StarRating = ({ stars }) => {
  if (stars === 0) return <span className="lesson-status-dot">●</span>;
  return (
    <div className="star-rating">
      {Array(3).fill(0).map((_, i) => (
        <span key={i} className={i < stars ? 'star filled' : 'star'}>★</span>
      ))}
    </div>
  );
};

const LessonMenu = ({ onSelectLesson, lessonIds, progress, onResetProgress }) => {
  const getLessonNumber = (id) => (id ? id.match(/U(\d+)/)[1] : '');

  return (
    <div>
      <header className="menu-header">
        <h1>Выберите урок</h1>
        <div className="user-stats">
          <div className="stat-item">🔥 Ударный режим: {progress.streak.count} д.</div>
          <div className="stat-item">✨ Очки: {progress.totalXP} XP</div>
        </div>
        <button onClick={onResetProgress} className="reset-button">
          Сбросить
        </button>
      </header>
      <div className="lesson-menu">
        {lessonIds.map(id => (
          <div key={id} className="lesson-card" onClick={() => onSelectLesson(id)}>
            <div className="lesson-card-number">Урок {getLessonNumber(id)}</div>
            <StarRating stars={progress.lessonScores[id] || 0} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonMenu;
