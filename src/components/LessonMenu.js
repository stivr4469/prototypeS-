// src/components/LessonMenu.js
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

const LessonMenu = ({ onSelectLesson, lessonIds, progress, onResetProgress, user, onSignOut }) => {
  const getLessonNumber = (id) => (id ? id.match(/U(\d+)/)[1] : '');
  
  const isGuest = !user;

  const handleReset = () => {
    if (isGuest) {
      alert("Сброс прогресса доступен только для зарегистрированных пользователей.");
      return;
    }
    onResetProgress();
  }

  return (
    <div>
      <header className="menu-header">
        <div className="menu-header-left">
          <h1>Выберите урок</h1>
          <div className="user-stats">
            {user && (
              <>
                <div className="stat-item">🔥 Ударный режим: {progress.streak.count} д.</div>
                <div className="stat-item">✨ Очки: {progress.totalXP} XP</div>
              </>
            )}
            {isGuest && (
              <div className="stat-item">👤 Гостевой режим (прогресс не сохраняется)</div>
            )}
          </div>
        </div>
        <div className="menu-header-right">
          {user && (
            <div style={{marginBottom: '10px', textAlign: 'right'}}>
              <span>Здравствуйте, {user.username}!</span>
              <button onClick={onSignOut} style={{ marginLeft: '10px' }} className="reset-button">
                Выйти
              </button>
            </div>
          )}
          {!isGuest && (
             <button onClick={handleReset} className="reset-button">
              Сбросить прогресс
            </button>
          )}
        </div>
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
