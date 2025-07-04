import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-box">
        {/* 👇 ИЗМЕНЕНИЯ ЗДЕСЬ 👇 */}
        <h1 className="welcome-title">¡Hola!</h1>
        <p className="welcome-subtitle">
          ¿Listo para hablar español?
        </p>
        <button className="welcome-button" onClick={onStart}>
          Начать обучение
        </button>
      </div>
      <footer className="welcome-footer">
        Valencia 2025
      </footer>
    </div>
  );
};

export default WelcomeScreen;
