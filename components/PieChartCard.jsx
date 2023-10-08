import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChartCard = () => {
  // Define your data for the pie chart
  const data = {
    labels: ['Dispatched', 'Completed', 'Failed'],
    datasets: [
      {
        data: [30, 60, 10], // Adjust these values according to your data
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'], // Customize colors as needed
      },
    ],
  };

  // Define options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '200px', height: '110px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartCard;
