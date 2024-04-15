import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import ExpenseChart from '../components/ExpenseChart';
import RecentExpenses from '../components/RecentExpenses';
import styles from '../style/HomePage.module.css';
import { MdOutlineAttachMoney } from "react-icons/md";
import Legend from '../components/Legend';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const colors = {
  Housing: "#FFB3BA",
  Utilities: "#FFD3BA",
  Transportation: "#FFFFBA",
  Food: "#BAFFC9",
  Healthcare: "#BAE1FF",
  Clothes: "#BAC2FF",
  "Personal Care": "#D9BAFF",
  Entertainment: "#FFBACD",
  Others: "#689534",
};

const Card = ({ children }) => (
  <div className={styles.card}>{children}</div> 
);

function HomePage() {
  const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "expenses"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const filteredExpenses = data.filter(expense => {
        const date = expense.date.toDate().toString();
        const dateString = date.replace(/(at|UTC.*$)/g, '').trim();
        const expenseDate = new Date(dateString);

        const monthIndex = expenseDate.getMonth();
        const month = months[monthIndex];

        // Check if the month matches the selected month
        return month === selectedMonth;
      });

      setExpenses(filteredExpenses);
    };

    fetchData();
  }, [selectedMonth]);

  useEffect(() => {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpenses(total);
  }, [expenses]);

  // const handleMonthChange = (e) => {
  //   setSelectedMonth(e.target.value);
  // };
  const options = {
    title: selectedMonth,
    pieHole: 0.4,
    pieSliceText: "label",
    legend: "none",
    pieSliceTextStyle: {
      color: "black",
    },
    pieStartAngle: 100,
    tooltip: { isHtml: true },
    chartArea: {
      left: "5%",
      top: "5%",
      width: "100%",
      height: "100%",
    },
    slices: expenses.map((_, index) => ({ color: colors[expenses[index].category] || "gray" })),
  };

  const data = [
    ["Expense", "Amount", { role: "style" }, { role: "tooltip", type: "string", p: { html: true } }],
    ...expenses.map((expense, index) => {
      const color = colors[expense.category] || "gray";
      return [expense.description, expense.amount, color, `<b>$${expense.amount.toFixed(2)}</b>`];
    }),
  ];

  const monthOptions = months.map((month) => (
    <option key={month} value={month}>{month}</option>
  ));

  return (
    <div className={styles.homepageContainer}>
      <Card>
        <div className={styles.totalExpenses}>
          <MdOutlineAttachMoney className={styles.content} size={40} />
          <h2 className={styles.content}>{totalExpenses.toFixed(2)}</h2>
          <p className={styles.content}>Total Expenses</p>
        </div>
      </Card>
      <Card>
        <div className={styles.chartContainer}>
          <ExpenseChart data={data} options={options} />
          <Legend colors={colors} />
        </div>
      </Card>
      <RecentExpenses />
    </div>

  );
}

export default HomePage;
