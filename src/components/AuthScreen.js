// src/components/AuthScreen.js
import React, { useState } from 'react';
import './AuthScreen.css';

const AuthScreen = ({ mode, onAuth, onGoogleSignIn, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(username, password);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{mode === 'login' ? 'Вход' : 'Регистрация'}</h2>
        <div className="form-group">
          <label htmlFor="username">Имя пользователя</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="button" onClick={onBack} className="back-btn">
            Назад
          </button>
          <button type="submit" className="submit-btn">
            {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </div>

        <div className="auth-divider">
          <span>ИЛИ</span>
        </div>

        <button type="button" className="welcome-button google" onClick={onGoogleSignIn}>
          Войти с помощью Google
        </button>
      </form>
    </div>
  );
};

export default AuthScreen;
