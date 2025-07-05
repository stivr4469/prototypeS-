// src/components/Login.js
import React from 'react';

const Login = ({ user, signInWithGoogle, signOutUser }) => {
  return (
    <div style={{ padding: '10px 0', textAlign: 'right' }}>
      {user ? (
        <div>
          <span>Здравствуйте, {user.displayName}!</span>
          <button onClick={signOutUser} style={{ marginLeft: '10px' }}>
            Выйти
          </button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>
          Войти через Google
        </button>
      )}
    </div>
  );
};

export default Login;
