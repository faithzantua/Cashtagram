import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './HomePage';
import Add from './AddPage';
import Expenses from './ExpensesPage';
import Help from './HelpPage';
import Navbar from './Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/help" element={<Help />} />
        <Route index element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
