import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import styles from '../style/RecentExpenses.module.css';

function RecentExpenses() {
  const [recentExpenses, setRecentExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentExpenses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "expenses"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const today = new Date();
        const lastSevenDays = new Date(today);
        lastSevenDays.setDate(today.getDate() - 7);
        const filteredExpenses = data.filter(expense => {
          const expenseDate = expense.date.toDate();
          return expenseDate >= lastSevenDays && expenseDate <= today;
        });
        const sortedExpenses = filteredExpenses.sort((a, b) => b.date.toDate() - a.date.toDate());
        setRecentExpenses(sortedExpenses);
      } catch (error) {
        console.error('Error fetching recent expenses:', error);
      }
    };

    fetchRecentExpenses();
  }, []);

  const handleAddExpense = () => {
    navigate("/add");
  };

  const handleViewAllExpenses = () => {
    navigate("/expenses");
  };

  return (
    <div className={styles.recentExpenses}>
      <h2>Recent Expenses</h2>
      <ul>
        {recentExpenses.slice(0, 7).map(expense => (
          <li key={expense.id}>
            <div className={styles.listContainer}>
              <span className={styles.description}>{expense.description}</span>
              <span className={styles.amount}>${expense.amount.toFixed(2)}</span>
            </div>
            <span className={styles.date}>{new Date(expense.date.toDate()).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
      <div className={styles.buttonContainer}>
        <span className={styles.viewAllExpensesBtn} onClick={handleViewAllExpenses}>View All Expenses</span>
        <button onClick={handleAddExpense}>Add New Expense</button>
      </div>
    </div>
  );
};

export default RecentExpenses;
