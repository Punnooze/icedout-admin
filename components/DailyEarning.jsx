'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import {
  IconArrowUpRight,
  IconCurrencyDollar,
  IconCurrencyRupee,
} from '@tabler/icons-react';
import DashboardCard from './DashboardCard';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DailyEarning = ({ daily, darray }) => {
  // Initialize the theme using useTheme
  const theme = useTheme();

  // Check if theme.palette exists before accessing the mode property
  const isDarkMode = 'dark';
  // theme.palette && theme.palette.mode === 'dark';

  // chart color
  const secondary = '#9081e5';
  const secondarylight = '#9081e5';

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'straight',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 2,
    },
    tooltip: {
      theme: isDarkMode ? 'dark' : 'light', // Use the isDarkMode variable
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      color: secondary,
      data: darray,
    },
  ];

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div class="tw-pr-3">
          <DashboardCard
            title="Daily Earnings"
            action={
              <Fab color="#58B6C3" size="medium">
                <IconCurrencyRupee width={25} />
              </Fab>
            }
            footer={
              <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="area"
                height="50%"
                width="100%"
              />
            }
          >
            <>
              <Typography variant="h3" fontWeight="700" mt="-20px">
              ₹{daily}
              </Typography>
            </>
          </DashboardCard>
        </div>
      </ThemeProvider>
    </>
  );
};

export default DailyEarning;
