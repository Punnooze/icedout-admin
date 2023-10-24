'use client';
import React, { useEffect, useState } from 'react';
import DashboardCard from './DashboardCard';
import dynamic from 'next/dynamic';
import Select from '@mui/material/Select'; // Import Select component
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function Dashboard({ year }) {
  let newDate = new Date();
  const currentMonth = newDate.getMonth();
  const [month, setMonth] = useState(currentMonth + 1);
  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const [sales, setSales] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [days, setDays] = useState([]);

  const [seriescolumnchart, setSeriesColumnChart] = useState([
    {
      name: 'Total Sales',
      data: null,
    },
    {
      name: 'Total Revenue',
      data: null,
    },
  ]);

  const seriescolchart = [
    {
      name: 'Total Sales',
      data: sales,
    },
    {
      name: 'Total Revenue',
      data: revenue,
    },
  ];

  // chart color
  const theme = useTheme();
  const isDarkMode = 'dark';

  const primary = isDarkMode ? '#04122A' : '#04122A';
  const secondary = '#58B6C3';

  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 350,
      width: '1325px', // Use the chartWidth variable for responsiveness
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '70%',
        columnWidth: '60%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },

    stroke: {
      show: true,
      curve: 'straight',
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: days,
      axisBorder: {
        show: true,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: true,
    },
  };

  useEffect(() => {
    {
      if (year) {
        console.log(year[month - 1]);
        const d = [];
        const s = [];
        const r = [];
        const months = year[month - 1];
        months.map((item) => {
          const day = item.day < 10 ? `0${item.day}` : item.day;
          d.push(`${day}/${month < 10 ? '0' : ''}${month}`);
          s.push(item.sales);
          r.push(item.revenue);
        });
        // console.log('d', d);
        // console.log('s', s, 'r', r);

        setSales(s);
        setRevenue(r);
        setDays(d);
        const series = seriescolumnchart;
        series[0].data = s;
        series[1].data = r;
        setSeriesColumnChart(series);

        // console.log(yearly);
        // console.log(month);
        // console.log('yearly[month]', yearly[month - 1]);
        // const options = [...seriescolumnchart];
        // options[1].data = yearly[month - 1];
        // setSeriesColumnChart(options);
        // // options[1] = [...options[1], (data = yearly[month - 1])];
        // console.log('options', options);
      }
    }
  }, [month]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="tw-pl-0 tw-pr-3">
          <DashboardCard
            title="Sales Overview"
            action={
              <Select
                labelId="month-dd"
                id="month-dd"
                value={month}
                size="small"
                onChange={handleChange}
              >
                {months.map((item, index) => {
                  return (
                    <MenuItem key={index} value={index + 1}>
                      {item}
                    </MenuItem>
                  );
                })}
                {/* <MenuItem value={2}>April 2023</MenuItem>
                <MenuItem value={3}>May 2023</MenuItem> */}
              </Select>
            }
          >
            {seriescolumnchart[0].data !== null &&
              seriescolumnchart[1].data !== null &&
              console.log('series', seriescolumnchart)}
            <Chart
              options={optionscolumnchart}
              series={seriescolchart}
              type="area"
              height="425px"
              width="1325px"
            />
          </DashboardCard>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default Dashboard;
