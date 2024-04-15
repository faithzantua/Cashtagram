// Legend.js
import React from "react";
import styles from '../style/Legend.module.css'; 

const Legend = ({ colors }) => {
  return (
    <div className={styles.legendContainer}>
      {Object.entries(colors).map(([category, color]) => (
        <div key={category} className={styles.legendItem}>
          <div className={styles.colorBox} style={{ backgroundColor: color }}></div>
          <span>{category}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
