import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from '../../firebase'; // Import Firestore
import { useNavigate } from 'react-router-dom';
import styles from './auth.module.css'; // Import CSS file for styling

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Check if user already exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setError('User already exists.');
        return;
      }

      // Add user details to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        userId: user.uid,
        name: name,
        email: email,
        // Add more user details as needed
      });

      // Navigate to home page after successful sign up
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.authHeading}>Sign Up</h2>
      <form className={styles.form} onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.loginInput} // Use the correct CSS class
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button className="loginButton" type="submit">Sign Up</button>
      </form>
      <p className="signUpText">Already have an account? <span className={styles.clickableBtn} onClick={() => navigate("/login")}>Log in</span></p>
    </div>
  );
}

export default SignUp;
