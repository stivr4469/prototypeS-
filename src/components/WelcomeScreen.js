// src/components/WelcomeScreen.js
import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onLoginClick, onRegisterClick, onStartAsGuest }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1 className="welcome-title">¡Hola!</h1>
        <p className="welcome-subtitle">
          Готовы улучшить свой испанский?
        </p>
        <button className="welcome-button login" onClick={onLoginClick}>
          Войти
        </button>
        <button className="welcome-button register" onClick={onRegisterClick}>
          Зарегистрироваться
        </button>
        <button className="welcome-button guest" onClick={onStartAsGuest}>
          Продолжить как гость
        </button>
      </div>
      <footer className="welcome-footer">
        Valencia 2025
      </footer>
    </div>
  );
};

export default WelcomeScreen;
