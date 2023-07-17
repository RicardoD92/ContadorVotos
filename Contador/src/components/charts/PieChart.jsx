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
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56','#6fbf73', '#35baf6', '#8561c5', '#33ab9f',"#6573c3",'#dd33fa'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56','#6fbf73', '#35baf6', '#8561c5', '#33ab9f',"#6573c3",'#dd33fa'],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
