'use client';
import React, { useState } from 'react'; // Removed unused useEffect import
import { useTheme } from '@mui/material/styles'; // Import useTheme from Material-UI
import DashboardCard from './DashboardCard';
import dynamic from "next/dynamic";
import Select from '@mui/material/Select'; // Import Select component
import MenuItem from '@mui/material/MenuItem';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function Dashboard() {
  // select
  const [month, setMonth] = useState('1');

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  // chart color
  const theme = useTheme(); // Initialize the theme using useTheme

  // Check if theme.palette exists before accessing the mode property
  const isDarkMode = theme.palette && theme.palette.mode === 'dark';

  const primary = isDarkMode ? '#04122A' : '#04122A';
  const secondary = '#58B6C3';

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 350,
      width:400,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '70%',
        columnWidth: '50%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },

    stroke: {
      show: true,
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: ['16/08', '17/08', '18/08', '19/08', '20/08', '21/08', '22/08', '23/08'],
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [
    {
      name: 'Total Sales',
      data: [355, 390, 300, 350, 390, 180, 355, 390],
    },
    {
      name: 'Total Revenue',
      data: [280, 250, 325, 215, 250, 310, 280, 250],
    },
  ];

  return (
    <div>
      <div class="pl-0">
    <DashboardCard title="Sales Overview" action={
      <Select
        labelId="month-dd"
        id="month-dd"
        value={month}
        size="small"
        onChange={handleChange}
      >
        <MenuItem value={1}>March 2023</MenuItem>
        <MenuItem value={2}>April 2023</MenuItem>
        <MenuItem value={3}>May 2023</MenuItem>
      </Select>
    }>
      <Chart
        options={optionscolumnchart}
        series={seriescolumnchart}
        type="area"
        height="425px"
        width="700px"
      />
    </DashboardCard>
    </div>
    </div>
  );
}

export default Dashboard;
