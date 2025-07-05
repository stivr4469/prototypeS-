// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import initialUsers from '../data/users.json';

const SESSION_KEY = 'spanishAppUser';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    // Сначала проверяем сессию Firebase
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Форматируем пользователя Firebase для единообразия
        const formattedUser = { 
          id: firebaseUser.uid, // Используем uid как уникальный id
          username: firebaseUser.displayName,
          provider: 'google'
        };
        setUser(formattedUser);
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(formattedUser));
      } else {
        // Если пользователя Firebase нет, проверяем локальную сессию
        try {
          const savedUser = sessionStorage.getItem(SESSION_KEY);
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Не удалось загрузить сессию пользователя:", error);
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (username, password) => {
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      const userData = { id: foundUser.id, username: foundUser.username, provider: 'local' };
      setUser(userData);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Неверное имя пользователя или пароль.' };
  };
  
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // onAuthStateChanged сам обработает обновление состояния
    } catch (error) {
      console.error("Ошибка аутентификации Google:", error);
      alert("Не удалось войти с помощью Google.");
    }
  };

  const register = (username, password) => {
    if (!username || !password) {
      return { success: false, message: 'Имя пользователя и пароль не могут быть пустыми.' };
    }
    const userExists = users.some(u => u.username === username);
    if (userExists) {
      return { success: false, message: 'Пользователь с таким именем уже существует.' };
    }
    
    const newUser = { id: Date.now(), username, password };
    setUsers(prevUsers => [...prevUsers, newUser]);

    const userData = { id: newUser.id, username: newUser.username, provider: 'local' };
    setUser(userData);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    
    alert('Регистрация прошла успешно! Вы вошли в систему.');
    return { success: true };
  };

  const logout = async () => {
    // Если пользователь из Firebase, выходим из Firebase
    if (user && user.provider === 'google') {
      await signOut(auth);
    }
    // В любом случае очищаем сессию и локальное состояние
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return { user, loading, login, register, signInWithGoogle, logout };
};
