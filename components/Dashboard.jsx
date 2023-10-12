"use client";
import React, { useState } from "react"; // Removed unused useEffect import
import DashboardCard from "./DashboardCard";
import dynamic from "next/dynamic";
import Select from "@mui/material/Select"; // Import Select component
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function Dashboard() {
  // select
  const [month, setMonth] = useState("1");

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  // chart color
  const theme = useTheme();
  const isDarkMode = theme.palette && theme.palette.mode === "dark";

  const primary = isDarkMode ? "#04122A" : "#04122A";
  const secondary = "#58B6C3";

  // chart
  const optionscolumnchart = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 350,
      width: "1325px", // Use the chartWidth variable for responsiveness
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "70%",
        columnWidth: "60%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },

    stroke: {
      show: true,
      curve: "straight",
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
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
      categories: [
        "16/08",
        "17/08",
        "18/08",
        "19/08",
        "20/08",
        "21/08",
        "22/08",
        "23/08",
        "24/08",
        "25/08",
        "26/08",
        "27/08",
      ],
      axisBorder: {
        show: true,
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: true,
    },
  };
  const seriescolumnchart = [
    {
      name: "Total Sales",
      data: [355, 390, 300, 350, 390, 180, 355, 390, 355, 390, 300],
    },
    {
      name: "Total Revenue",
      data: [280, 250, 325, 215, 250, 310, 280, 250, 280, 250, 325],
    },
  ];

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
                <MenuItem value={1}>March 2023</MenuItem>
                <MenuItem value={2}>April 2023</MenuItem>
                <MenuItem value={3}>May 2023</MenuItem>
              </Select>
            }
          >
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
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
