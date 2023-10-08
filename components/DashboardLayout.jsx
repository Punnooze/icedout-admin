"use client";
import React, { useEffect } from "react";
import { Grid } from '@mui/material';
import Dashboard from "./Dashboard";
import MonthlyEarnings from "./MonthlyEarning";
import OrderDivision from "./OrderDivision";
import ProductStock from "./ProductStock";
import DailyEarning from "./DailyEarning";

function DashboardLayout() {
  return (
    <div>
      <div className="tw-ml-[70px] tw-pl-6 tw-h-[100vh] tw-overflow-y-auto tw-bg-background">
        <h1>DASHBOARD</h1>
        <Grid container spacing={3}>
          {/* Row containing Traffic, Followers, Monthly Earnings, and Order Division */}
          <Grid item xs={12} sm={6} lg={4}>
            <MonthlyEarnings />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <OrderDivision />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <DailyEarning />
          </Grid>

          {/* Row containing Dashboard */}
          <Grid item xs={12} lg={12}>
            <Dashboard />
          </Grid>
          
          {/* Row containing Product Stock */}
          <Grid item xs={12} lg={12}>
            <ProductStock />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default DashboardLayout;
