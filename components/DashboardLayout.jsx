"use client";
import React, { useEffect } from "react";
import { Grid } from '@mui/material';
import Dashboard from "./Dashboard";
import MonthlyEarnings from "./MonthlyEarning";
import OrderDivision from "./OrderDivision";
import ProductStock  from "./ProductStock";
import Followers from "./Followers";
import Traffic from "./Traffic";

function DashboardLayout() {
  return (
    <div>  
      <div class="pl-6 h-[100vh] overflow-y-auto">
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
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Traffic />
              </Grid>
              <Grid item xs={12}>
                <Followers />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductStock />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default DashboardLayout;
