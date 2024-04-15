import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../style/Navbar.module.css';
import logo from '../assets/Logo.png';
import { signOut } from 'firebase/auth'; 
import { auth } from '../firebase'; 
import { onAuthStateChanged } from 'firebase/auth'; 

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState(null);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className={`${styles.navbar}`}>
          <NavLink to='/' className={styles.logo}>
            <img src={logo} alt="Logo" style={{ width: '50px', height: 'auto' }} />
          </NavLink>
          <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
            <li onClick={removeActive}>
              <NavLink to='/' className={`${styles.navLink}`} activeClassName={styles.active}>Home</NavLink>
            </li>
            <li onClick={removeActive}>
              <NavLink to='/add' className={`${styles.navLink}`} activeClassName={styles.active}>Add</NavLink>
            </li>
            <li onClick={removeActive}>
              <NavLink to='/expenses' className={`${styles.navLink}`} activeClassName={styles.active}>Expenses</NavLink>
            </li>
            <li onClick={removeActive}>
              <NavLink to='/help' className={`${styles.navLink}`} activeClassName={styles.active}>Help</NavLink>
            </li>
            <li><button className={styles.logOut} onClick={handleLogout}>Logout</button></li>
          </ul>
          <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`} onClick={toggleActiveClass}>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
