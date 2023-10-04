"use client";
import React, { useEffect } from "react";
const { Grid, Typography, Fab } = require('@mui/material');
import { IconBrandInstagram } from '@tabler/icons-react';
import DashboardCard from "./DashboardCard";

const Followers = () => {

  return (
    <div class="pr-3">
    <DashboardCard title="Instagram Followers" action={
        <Fab color="#58B6C3" size="medium">
          <IconBrandInstagram width={25}/>
        </Fab>
      }>
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            200
          </Typography>
        </Grid>
      </Grid>
    </DashboardCard>
    </div>
  );
};

export default Followers;