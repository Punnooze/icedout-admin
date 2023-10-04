"use client";
import React, { useEffect } from "react";
import { Grid } from '@mui/material';
import Dashboard from "./Dashboard";
import MonthlyEarnings from "./MonthlyEarning";
import OrderDivision from "./OrderDivision";
import ProductStock  from "./ProductStock";


function DashboardLayout() {
  return (
    <div>  
      <div class="pl-6">
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
          <Grid item xs={12} lg={12}>
            <ProductStock />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default DashboardLayout;
