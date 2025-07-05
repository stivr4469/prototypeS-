// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import initialUsers from '../data/users.json';

const SESSION_KEY = 'spanishAppUser';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // В реальном приложении это был бы API-запрос.
  // Здесь мы симулируем базу данных, добавляя новых пользователей только в оперативную память.
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    // Проверяем сессию при загрузке приложения
    try {
      const savedUser = sessionStorage.getItem(SESSION_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Не удалось загрузить сессию пользователя:", error);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      const userData = { id: foundUser.id, username: foundUser.username };
      setUser(userData);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Неверное имя пользователя или пароль.' };
  };

  const register = (username, password) => {
    if (!username || !password) {
      return { success: false, message: 'Имя пользователя и пароль не могут быть пустыми.' };
    }
    const userExists = users.some(u => u.username === username);
    if (userExists) {
      return { success: false, message: 'Пользователь с таким именем уже существует.' };
    }
    
    // Внимание: Симуляция. В реальном приложении здесь был бы запрос к API.
    // Мы добавляем пользователя только в локальное состояние.
    const newUser = { id: Date.now(), username, password };
    setUsers(prevUsers => [...prevUsers, newUser]);

    // И сразу логиним его
    const userData = { id: newUser.id, username: newUser.username };
    setUser(userData);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    
    alert('Регистрация прошла успешно! Вы вошли в систему.');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return { user, loading, login, register, logout };
};
