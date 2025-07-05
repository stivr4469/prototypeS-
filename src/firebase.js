// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw9alPWIbugpMhtglXgefI2rCwON1AYNI",
  authDomain: "aprener-esp.firebaseapp.com",
  projectId: "aprener-esp",
  storageBucket: "aprener-esp.firebasestorage.app",
  messagingSenderId: "18281345421",
  appId: "1:18281345421:web:3ee9a9a8a4609af5c48dc4",
  measurementId: "G-XQGFXP008B"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
