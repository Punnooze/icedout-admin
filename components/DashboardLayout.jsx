'use client';
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Dashboard from './Dashboard';
import MonthlyEarnings from './MonthlyEarning';
import OrderDivision from './OrderDivision';
import ProductStock from './ProductStock';
import DailyEarning from './DailyEarning';
import axios from 'axios';

function DashboardLayout() {
  // select

  let newDate = new Date();
  const currentDate = newDate.getDate();
  const currentMonth = newDate.getMonth();

  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null);
  const [profits, setProfits] = useState(null);
  const [cod, setCod] = useState(0);
  const [prepaid, setPrepaid] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [daily, setDaily] = useState(0);
  const [calculate, setCalculate] = useState(false);
  const [noOfOrders, setNoOfOrders] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [monthlyArray, setMonthlyArray] = useState([]);
  const [dailyArray, setDailyArray] = useState([]);
  const [latestOrders, setLatestOrders] = useState([]);

  // const [year, setYear] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [year, setYear] = useState(Array(12).fill([]));
  const [runOnce, setRunOnce] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get('/api/fetch');
        const data = await res.json();
        if (data.data) {
          setProfits(data.data[2]);
          setProducts(data.data[1]);
          setOrders(data.data[0]);
        }
      } catch (error) {
        console.log('Error', error);
      }
    };
    getOrders();
  }, []);

  useEffect(() => {
    if (orders && runOnce) {
      let k = 0;
      const latestOrders = [];
      const noOfOrders = orders.length;
      setNoOfOrders(noOfOrders);
      let monthly = 0;
      let daily = 0;
      let prev = 0;
      let pcod = 0;
      let pprepaid = 0;
      orders.map((item) => {
        if (k < 5) {
          latestOrders.push(item);
          k++;
        }
        if (item.paymentMethod === 'cod') pcod += 1;
        if (item.paymentMethod === 'prepaid') pprepaid += 1;

        const createdDate = item.createdAt.slice(8, 10);
        const createdMonth = item.createdAt.slice(5, 7);

        if (createdMonth == currentMonth + 1 && item.status !== 'Failed') {
          monthly += item.totalPrice;
          const montharray = monthlyArray;
          montharray.push(item.totalPrice);
          setMonthlyArray(montharray);
        }

        if (createdMonth == currentMonth && item.status !== 'Failed') {
          prev += item.totalPrice;
        }

        console.log(
          'IDK',
          createdDate,
          currentDate,
          createdMonth,
          currentMonth
        );
        if (
          createdDate == currentDate &&
          createdMonth == currentMonth + 1 &&
          item.status !== 'Failed'
        ) {
          daily += item.totalPrice;
          const dailyarray = dailyArray;
          dailyarray.push(item.totalPrice);
          setDailyArray(dailyarray);
        }
      });

      const arr = [...year];
      for (let i = 0; i < 12; i++) {
        let month = arr[i];
        const dailySales = Array(31).fill(0);
        const dailyRevenue = Array(31).fill(0);

        // Iterate through the orders
        orders.forEach((item) => {
          const createdMonth = Number(item.createdAt.slice(5, 7));
          if (createdMonth === i + 1 && item.status !== 'Failed') {
            const createdDay = Number(item.createdAt.slice(8, 10));
            dailySales[createdDay - 1] += 1; // Increment daily sales
            dailyRevenue[createdDay - 1] += item.totalPrice; // Increment daily revenue
          }
        });
        const monthData = [];
        for (let day = 0; day < 31; day++) {
          if (dailySales[day] !== 0 && dailyRevenue[day] !== 0) {
            // Only push non-zero data
            monthData.push({
              day: day + 1, // Day of the month
              sales: dailySales[day], // Daily sales
              revenue: dailyRevenue[day], // Daily revenue
            });
          }
        }
        month = monthData;
        arr[i] = month;
      }
      setYear(arr);


      if (prev != 0) {
        const perc = Math.round(((monthly - prev) / prev) * 100);

        setPercentage(perc);
      } else setPercentage(100);
      setMonthly(monthly);
      setDaily(daily);
      setLatestOrders(latestOrders);
      setCod(pcod);
      setPrepaid(pprepaid);
      setCalculate(true);

      // console.log('month array', monthlyArray);

      // console.log('latest', latestOrders);
      setRunOnce(false)
    }
  }, [currentDate,dailyArray,orders,monthlyArray,currentMonth,year,runOnce]);

  // useEffect(() => {
  //   if (calculate) {
  //     console.log(cod, prepaid, daily, monthly);
  //   }
  // }, [calculate]);

  //
  return (
    <div>
      <div className="tw-ml-[70px] tw-pl-6 tw-h-[100vh] tw-overflow-y-auto tw-bg-background">
        <h1 className="tw-text-darkergrey">DASHBOARD</h1>
        <Grid container spacing={3}>
          {/* Row containing Traffic, Followers, Monthly Earnings, and Order Division */}
          {monthly && monthlyArray ? (
            <Grid item xs={12} sm={6} lg={4}>
              <MonthlyEarnings earnings={monthly} marray={monthlyArray} />
            </Grid>
          ) : null}
          <Grid item xs={12} sm={6} lg={4}>
            <OrderDivision
              cod={cod}
              prepaid={prepaid}
              sales={noOfOrders}
              perc={percentage}
            />
          </Grid>

          {daily && dailyArray ? (
            <Grid item xs={12} sm={6} lg={4}>
              <DailyEarning daily={daily} darray={dailyArray} />
            </Grid>
          ) : null}

          {calculate && (
            <Grid item xs={12} lg={12}>
              <Dashboard year={year} />
            </Grid>
          )}
          {/* Row containing Product Stock */}
          {latestOrders.length > 0 && (
            <Grid item xs={12} lg={12}>
              <ProductStock latest={latestOrders} />
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
}

export default DashboardLayout;
