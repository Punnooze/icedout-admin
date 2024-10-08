'use client';
import React, { useEffect, useState } from 'react';
import MyTable from './Table';
import NumberCard from './NumberCard';
import { PieChart } from '@mui/x-charts/PieChart';

export const themeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#03dac6',
      light: '#3f51b5',
    },
    secondary: {
      main: '#383d82',
    },
  },
};

function Orders({ data }) {
  const [Confirmed, setConfirmedCount] = useState(0);
  const [Shipped, setShippedCount] = useState(0);
  const [Outfordelivery, setOutfordeliveryCount] = useState(0);
  const [Delivered, setDeliveredCount] = useState(0);
  const [Failed, setFailedCount] = useState(0);
  const [liveOrders, setLiveOrders] = useState(0);

  useEffect(() => {
    if (Array.isArray(data)) {
      let Confirmed = 0;
      let Shipped = 0;
      let Outfordelivery = 0;
      let Delivered = 0;
      let Failed = 0;

      data.forEach((item) => {
        switch (item.status) {
          case 'Confirmed':
            Confirmed++;
            break;
          case 'Shipped':
            Shipped++;
            break;
          case 'Out for delivery':
            Outfordelivery++;
            break;
          case 'Delivered':
            Delivered++;
            break;
          case 'Failed':
            Failed++;
            break;
          default:
            break;
        }
      });
      setLiveOrders(Confirmed + Shipped + Outfordelivery);
      setConfirmedCount(Confirmed);
      setShippedCount(Shipped);
      setOutfordeliveryCount(Outfordelivery);
      setDeliveredCount(Delivered);
      setFailedCount(Failed);
    }
  }, [data]);

  return (
    <div className="tw-h-[100vh] tw-ml-[70px] tw-bg-background tw-overflow-y-auto tw-overflow-x-hidden  ">
      <div className="tw-h-[90vh] tw-flex tw-flex-col tw-items-center tw-align-middle">
        <div className="tw-ml-[70px] tw-w-[100%]">
          <h1 className="tw-text-darkergrey md:tw-ml-[20px] tw-[10vh]">ORDERS </h1>
        </div>


        <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-7 tw-gap-[20px] tw-ml-[70px] tw-mr-[70px] tw-p-[20px] tw-w-full md:tw-w-[90vw] ">
          <div className="tw-col-start-1 lg:tw-col-start-2 ">
            <NumberCard header="Total Orders" number={data.length} />
          </div>
          <div className="tw-col-start-2 lg:tw-col-start-4">
            <NumberCard header="Live Orders" number={liveOrders} />
          </div>
          <div className="tw-hidden md:tw-visible tw-w-[200px] tw-h-[110px] lg:tw-col-start-6 tw-bg-darkergrey md:tw-flex tw-justify-center tw-items-center tw-align-middle tw-p-[10px] tw-rounded-md">
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: Confirmed, label: 'Confirmed' },
                    { id: 1, value: Shipped, label: 'Shipped' },
                    { id: 2, value: Outfordelivery, label: 'Delivery' },
                    { id: 3, value: Delivered, label: 'Delivered' },
                    { id: 4, value: Failed, label: 'Failed' },
                  ],
                },
              ]}
              width={350}
              height={175}
            />
          </div>
        </div>


        <div className="  tw-bg-darkergrey tw-rounded-md tw-tw-shadmd tw- tw-flex tw-justify-center tw-items-center tw-align-middle  ">
          <MyTable data={data} />
        </div>
      </div>
    </div>
  );
}

export default Orders;
