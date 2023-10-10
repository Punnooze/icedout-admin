"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const { useTheme } = require('@mui/material/styles');
const { Grid, Stack, Typography, Avatar } = require('@mui/material');
const { IconArrowUpRight } = require('@tabler/icons-react');
import DashboardCard from "./DashboardCard";

const OrderDivision = () => {
  // Initialize the theme using useTheme
  const theme = useTheme();

  // Check if theme.palette exists before accessing the mode property
  const isDarkMode = theme.palette && theme.palette.mode === "dark";

  // chart color
  const primary = '#04122A';
  const primarylight = "#58B6C3";
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
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
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      theme: isDarkMode ? "dark" : "light", // Use the isDarkMode variable
      fillSeriesColor: false,
    },
    stroke: {
      show: true,
    },
    dataLabels: {
      enabled: true,
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
  const seriescolumnchart = [2000,1000];

  return (
    <div className="tw-pr-3">
    <DashboardCard title="Total Orders">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            3000
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: 'lightgreen', width: 27, height: 27 }}>
              <IconArrowUpRight width={20} color="green" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              +9%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              last month
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                Online
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
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
            width='75%'
          />
        </Grid>
      </Grid>
    </DashboardCard>
    </div>
  );
};

export default OrderDivision;