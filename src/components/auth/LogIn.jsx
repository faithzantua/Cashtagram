import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../../firebase'; 
import { useNavigate } from 'react-router-dom';
import styles from './auth.module.css';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setError('Account not found. Please sign up.');
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.authHeading}>Welcome to Cashtagram!</h2>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={styles.loginError}>{error}</p>}
        <button type="submit">Log in</button>
      </form>
      <p>Don't have an account? <span className={styles.clickableBtn} onClick={() => navigate("/signup")}>Sign up</span></p>
    </div>
  );
}

export default LogIn;
