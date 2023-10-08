'use client';
import React, { useState } from 'react';
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

  const filteredRows = rows.filter((row) => {
    return (
      (!filterStatus || row.status === filterStatus) &&
      (!filterColumn ||
        String(row[filterColumn])
          .toLowerCase()
          .includes(searchText.toLowerCase()))
    );
  });

  const handleEditCellChange = (params) => {
    const { id, field, props } = params;
    if (field === 'status') {
      // Validate the edited status value
      const editedValue = props.value.toLowerCase();
      if (statusOptions.includes(editedValue)) {
        // Update the status in the row
        const updatedRows = rows.map((row) =>
          row.id === id ? { ...row, status: editedValue } : row
        );
        // Update the rows
        // Note: In a real app, you would typically send this data to a server for persistence.
        rows = updatedRows;
      } else {
        // Show an alert for an invalid status value
        alert(
          'Invalid status value. Please enter "paid," "failed," or "return."'
        );
      }
    }
  };

  return (
    <div className="tw-h-[100vh] tw-ml-[70px] tw-bg-background tw-flex tw-flex-col tw-items-center tw-align-middle">
      {/* <div className=' h-[200px] '>
        <OrderDivision />
      </div> */}
      <div className=" tw-grid md:tw-grid-cols-7 tw-grid-cols-2 tw-gap-[20px] md:tw-gap-0 tw-ml-[70px] tw-mr-[70px] md:tw-mr-0 md:tw-ml-0 tw-p-[20px] tw-w-[90vw] md:tw-w-[95vw] ">
        <div className="tw-col-start-1 md:tw-col-start-2">
          <NumberCard header="Total Sales" number="3000" />
        </div>

        <div className="tw-col-start-2 md:tw-col-start-4">
          <NumberCard header="Live orders" number="120" />
        </div>
        {/* <PieChartCard /> */}
        <div
          className="tw-hidden md:tw-visible tw-row-start-2 md:tw-row-start-1 md:tw-col-start-6 tw-w-[200px] tw-h-[110px] tw-bg-darkergrey md:tw-flex tw-justify-center tw-items-center tw-align-middle tw-p-[10px] tw-rounded-md"
          tw-
        >
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 100, label: 'Dispatchd' },
                  { id: 1, value: 250, label: 'Processng' },
                  { id: 2, value: 200, label: 'Failed' },
                ],
              },
            ]}
            width={350}
            height={175}
          />
        </div>
      </div>

      <div className="  tw-bg-darkergrey tw-rounded-md tw-tw-shadmd tw- tw-flex tw-justify-center tw-items-center tw-align-middle">
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
