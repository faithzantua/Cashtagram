import React from 'react';
import { Chart } from "react-google-charts";

const ExpenseChart = ({ data, options }) => {
  return (
    <Chart
      className="chart"
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
};

export default ExpenseChart;
