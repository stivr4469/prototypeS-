// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Замените этот объект на вашу конфигурацию из Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация Firebase Authentication и получение провайдера
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
