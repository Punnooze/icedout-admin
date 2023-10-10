'use client';
import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridToolbarFilterButton,
  GridToolbarExport,
} from '@mui/x-data-grid';
import Select from './Select'; // Custom Select component
import SearchBar from './SearchBar'; // Custom SearchBar component
import { TrashIcon } from '@heroicons/react/24/solid';
import { ThemeOptions } from '@mui/material/styles';
import MyTable from './Table';
import DailyEarning from './DailyEarning';
import OrderDivision from './OrderDivision';
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
let rows = [
  { id: 1, status: 'completed', col2: 'Data 1' },
  { id: 2, status: 'failed', col2: 'Data 2' },
  { id: 3, status: 'processing', col2: 'Data 3' },
  // Add more rows
];

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'status', headerName: 'Status', width: 150, editable: true }, // Allow editing
  { field: 'col2', headerName: 'Column 2', width: 150 },
  // Add more columns
];

const statusOptions = ['paid', 'failed', 'return'];
function Orders({ data }) {
  const [filterStatus, setFilterStatus] = useState('');
  const [filterColumn, setFilterColumn] = useState('');
  const [searchText, setSearchText] = useState('');
  const [enter, setEnter] = useState(false);

  const [Confirmed, setConfirmedCount] = useState(0);
  const [Shipped, setShippedCount] = useState(0);
  const [Outfordelivery, setOutfordeliveryCount] = useState(0);
  const [Delivered, setDeliveredCount] = useState(0);
  const [Failed, setFailedCount] = useState(0);
  const [liveOrders, setLiveOrders] = useState(0);

  // Assuming you fetch or set the data into the "data" state variable

  // useEffect(() => {
  // Calculate the counts when the "data" state changes
  useEffect(() => {
    // Count the number of each status type
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

      // Update state variables
      console.log(Confirmed, Shipped, Outfordelivery, Delivered, Failed);
      setLiveOrders(Confirmed + Shipped + Outfordelivery);
      setConfirmedCount(Confirmed);
      setShippedCount(Shipped);
      setOutfordeliveryCount(Outfordelivery);
      setDeliveredCount(Delivered);
      setFailedCount(Failed);
    }
  }, [data]);

  const filteredRows = rows.filter((row) => {
    return (
      (!filterStatus || row.status === filterStatus) &&
      (!filterColumn ||
        String(row[filterColumn])
          .toLowerCase()
          .includes(searchText.toLowerCase()))
    );
  });



  return (
    <div className="tw-h-[100vh] tw-ml-[70px] tw-bg-background tw-flex tw-flex-col tw-items-center tw-align-middle">
      {/* <div className=' h-[200px] '>
        <OrderDivision />
      </div> */}
      <div className=" tw-grid md:tw-grid-cols-7 tw-grid-cols-2 tw-gap-[20px] md:tw-gap-0 tw-ml-[70px] tw-mr-[70px] md:tw-mr-0 md:tw-ml-0 tw-p-[20px] tw-w-[90vw] md:tw-w-[95vw] ">
        <div className="tw-col-start-1 md:tw-col-start-2">
          <NumberCard header="Total Orders" number={data.length} />
        </div>

        <div className="tw-col-start-2 md:tw-col-start-4">
          <NumberCard header="Live Orders" number={liveOrders} />
        </div>
        {/* <PieChartCard /> */}
        <div
          className="tw-hidden md:tw-visible tw-row-start-2 md:tw-row-start-1 md:tw-col-start-6 tw-w-[200px] tw-h-[110px] tw-bg-darkergrey md:tw-flex tw-justify-center tw-items-center tw-align-middle tw-p-[10px] tw-rounded-md"
          tw-
        >
          {/* {Confirmed && Shipped && Outfordelivery && Delivered && Failed && ( */}
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
          {/* )} */}
        </div>
      </div>

      <div className="  tw-bg-darkergrey tw-rounded-md tw-tw-shadmd tw- tw-flex tw-justify-center tw-items-center tw-align-middle ">
        {/* <div className='w-[100%] h-[100%] bg-lightpurple'>hello</div> */}
        <MyTable data={data} />
      </div>
    </div>
    // <div className="flex flex-col ml-[70px] h-[100vh]  bg-background  justify-center items-center align-middle">

    //   <div className="grid bg-darkgrey grid-cols-10 gap-[20px] w-[90%] mb-[20px]">
    //     <div className="flex flex-col justify-center items-center col-span-3 h-[100%] w-[100%]
    //       <label className="text-[14px] font-normal">Filter by status</label>
    //       <Select
    //         options={['', 'completed', 'failed', 'processing']}
    //         value={filterStatus}
    //         onChange={(value) => setFilterStatus(value)}
    //       />
    //     </div>

    //     <div className="flex flex-col justify-center items-center col-span-3 ">
    //       <label className="text-[14px] font-normal">Select column</label>
    //       <Select
    //         options={['', 'id', 'status', 'col2']}
    //         value={filterColumn}
    //         onChange={(value) => setFilterColumn(value)}
    //       />
    //     </div>

    //     <div className="flex flex-col justify-center items-center col-span-3 w-[100%]">
    //       <label className="text-[14px] font-normal">Searchbar</label>
    //       <SearchBar
    //         value={searchText}
    //         onChange={(value) => setSearchText(value)}
    //         placeholder={`Search`}
    //       />
    //     </div>
    //     <div className="w-[100%] h-[100%]">
    //       <button
    //         className="w-[100%] h-[100%] flex justify-center items-center align-middle"
    //         onClick={() => {
    //           setFilterColumn('');
    //           setFilterStatus('');
    //           setSearchText('');
    //         }}
    //       >
    //         <TrashIcon
    //           onMouseEnter={() => setEnter(true)}
    //           onMouseLeave={() => setEnter(false)}
    //           className="w-6 h-6 lg:w-7 lg:h-7 lg:hover:w-8 lg:hover:h-8 duration-100"
    //         />
    //       </button>
    //     </div>
    //   </div>

    //   {/*<div> <MyTable /></div> */}

    //   <div className=" w-[90%]  ">
    //     <div style={{ height: 500, width: '100%' }}>
    //       <DataGrid
    //         sx={{
    //           boxShadow: 2,
    //           border: 2,
    //           backgroundColor: 'darkgrey',
    //           borderRadius: 2,
    //           borderColor: 'primary.main',
    //           '& .MuiDataGrid-cell': {
    //             border: 1,
    //             borderColor: 'primary.main',
    //           },
    //           '& .MuiDataGrid-cell:hover': {
    //             color: 'secondary.main',
    //           },
    //         }}
    //         rows={filteredRows}
    //         columns={columns}
    //         components={{
    //           Toolbar:  GridToolbarFilterButton
    //         }}
    //         onEditCellChange={handleEditCellChange} // Handle cell editing
    //         className="border rounded shadmd tw-" // Apply Tailwind CSS styling
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}

export default Orders;
