"use client";
import React, { useEffect } from "react";
import { Grid } from '@mui/material';
import Dashboard from "./Dashboard";
import MonthlyEarnings from "./MonthlyEarning";
import OrderDivision from "./OrderDivision";


function DashboardLayout() {
  return (
    <div>  
      <h1>DASHBOARD</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Dashboard />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <OrderDivision />
            </Grid>
            <Grid item xs={12}>
              <MonthlyEarnings />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default DashboardLayout;
