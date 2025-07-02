import React from 'react';

const LessonMenu = ({ onSelectLesson }) => {
  const lessonIds = Array.from({ length: 126 }, (_, i) => i + 1);

  return (
    <div>
      <header>
        <h1>Выберите урок</h1>
      </header>
      <div className="lesson-menu">
        {lessonIds.map(id => (
          <button className="lesson-button" key={id} onClick={() => onSelectLesson(id)}>
            Урок {id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LessonMenu;
