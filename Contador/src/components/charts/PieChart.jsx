import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChart = ({ data }) => {
  if (!data) {
    return null;
  }

  const chartData = {
    labels: data.map(item => item.nombre),
    datasets: [
      {
        data: data.map(item => item.votos),
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
