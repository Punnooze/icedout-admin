'use client';
import React, { useEffect } from 'react';
import dynamic from "next/dynamic";
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowUpRight, IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from './DashboardCard';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Traffic = () => {
  // Initialize the theme using useTheme
  const theme = useTheme();

  // Check if theme.palette exists before accessing the mode property
  const isDarkMode = theme.palette && theme.palette.mode === 'dark';

  // chart color
  const secondary = '#58B6C3';
  const secondarylight = '#f5fcff';

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'line',
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
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: isDarkMode ? 'dark' : 'light', // Use the isDarkMode variable
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      color: secondary,
      data: [250, 660, 200, 400, 120, 580, 200],
    },
  ];

  return (
    <div >
    <DashboardCard
      title="Website Traffic"
      action={
        <Fab color="#58B6C3" size="medium">
          <IconCurrencyDollar width={25}/>
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="line" height="60px" width='100%'/>
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          Too much traffic
        </Typography>
      </>
    </DashboardCard>
    </div>
  );
};

export default Traffic;
