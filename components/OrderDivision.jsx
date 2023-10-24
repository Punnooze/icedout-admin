'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
const { Grid, Stack, Typography, Avatar } = require('@mui/material');
const { IconArrowUpRight, IconArrowDownLeft } = require('@tabler/icons-react');
import DashboardCard from './DashboardCard';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const OrderDivision = ({ cod, prepaid, sales, perc }) => {
  // Initialize the theme using useTheme
  const theme = useTheme();

  console.log('cod', cod, 'prepaid', prepaid);

  // Check if theme.palette exists before accessing the mode property
  const isDarkMode = theme.palette && theme.palette.mode === 'dark';

  // chart color
  const primary = '#9081e5';
  const primarylight = '#58B6C3';
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 400,
    },
    colors: [primary, primarylight],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: isDarkMode ? 'dark' : 'light', // Use the isDarkMode variable
      fillSeriesColor: true,
    },
    stroke: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart = [prepaid, cod];

  const bgColour = perc > 0 ? 'lightgreen' : 'red';

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div className="tw-pr-3">
          <DashboardCard title="Total Orders">
            <Grid container spacing={3}>
              {/* column */}
              <Grid item xs={7} sm={7}>
                <Typography variant="h3" fontWeight="700">
                  {sales}
                </Typography>
                <Stack direction="row" spacing={1} mt={1} alignItems="center">
                  <Avatar sx={{ bgcolor: bgColour, width: 27, height: 27 }}>
                    {perc > 0 ? (
                      <IconArrowUpRight width={20} color="green" />
                    ) : (
                      <IconArrowDownLeft width={20} color="grey" />
                    )}
                  </Avatar>
                  <Typography variant="subtitle2" fontWeight="600">
                    {perc}%
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    last month
                  </Typography>
                </Stack>
                <Stack spacing={3} mt={5} direction="row">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      sx={{
                        width: 9,
                        height: 9,
                        bgcolor: primary,
                        svg: { display: 'none' },
                      }}
                    ></Avatar>
                    <Typography variant="subtitle2" color="textSecondary">
                      Online
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      sx={{
                        width: 9,
                        height: 9,
                        bgcolor: primarylight,
                        svg: { display: 'none' },
                      }}
                    ></Avatar>
                    <Typography variant="subtitle2" color="textSecondary">
                      COD
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              {/* column */}
              <Grid item xs={5} sm={5}>
                <Chart
                  options={optionscolumnchart}
                  series={seriescolumnchart}
                  type="pie"
                  height="150px"
                  width="75%"
                />
              </Grid>
            </Grid>
          </DashboardCard>
        </div>
      </ThemeProvider>
    </>
  );
};

export default OrderDivision;
