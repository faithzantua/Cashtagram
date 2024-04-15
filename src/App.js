import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/HomePage';
import Add from './components/AddPage';
import Expenses from './components/ExpensesPage';
import Help from './components/help';
import HelpAdd from "./components/help/Add";
import HelpHome from "./components/help/Home";
import HelpExpenses from "./components/help/Expenses";
import Navbar from './components/Navbar';
import SignUp from './components/auth/SignUp';
import LogIn from './components/auth/LogIn';
import AuthGuard from './components/auth/AuthGuard';
import { signOut } from 'firebase/auth'; 
import { auth } from './firebase'; 
import { onAuthStateChanged } from 'firebase/auth'; 

function App() {
  const [user, setUser] = useState(null);

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
    <Router>
      {/* {user && <Navbar />}  */}
      {user && <Navbar handleLogout={handleLogout} />}
      <AuthGuard />
      <Routes>
        <Route path="/" element={<Home />} index /> 
        <Route path="/login" element={<LogIn />} index /> 
        <Route path="/signup" element={<SignUp />} index /> 
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/add/:expenseId" element={<Add />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/help" element={<Help />} />
        <Route path="/help" element={<Help />}>
          <Route path="home" element={<HelpHome />} />
          <Route path="add" element={<HelpAdd />} />
          <Route path="expenses" element={<HelpExpenses />} />
        </Route>
      </Routes>
      {/* {user && <button onClick={handleLogout}>Logout</button>}  */}
    </Router>
  );
};

export default App;
