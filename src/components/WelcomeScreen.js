import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1 className="welcome-title">¡Bienvenido a AprenderEsp!</h1>
        <p className="welcome-subtitle">
          Ваш путь к изучению испанского начинается здесь. Удачи!
        </p>
        <button className="welcome-button" onClick={onStart}>
          Перейти к урокам
        </button>
      </div>
      {/* 👇 ДОБАВЛЕННЫЙ ФУТЕР 👇 */}
      <footer className="welcome-footer">
        Valencia 2025
      </footer>
    </div>
  );
};

export default WelcomeScreen;
