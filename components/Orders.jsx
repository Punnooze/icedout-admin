'use client';
import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Select from './Select'; // Custom Select component
import SearchBar from './SearchBar'; // Custom SearchBar component
import { TrashIcon } from '@heroicons/react/24/solid';

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
    <div className="flex flex-col h-[100vh] w-[100vw]  bg-lightblue  justify-center items-center align-middle">
      {/* {data && <div>{data}</div>} */}
      <div className="grid grid-cols-10 gap-[20px] w-[90%] mb-[20px]">
        <div className="flex flex-col justify-center items-center col-span-3 h-[100%] w-[100%]">
          <label className='text-[14px] font-normal'>Filter by status</label>
          <Select
            options={['', 'completed', 'failed', 'processing']}
            value={filterStatus}
            onChange={(value) => setFilterStatus(value)}
          />
        </div>

        <div className="flex flex-col justify-center items-center col-span-3 ">
          <label className='text-[14px] font-normal'>Select column</label>
          <Select
            options={['', 'id', 'status', 'col2']}
            value={filterColumn}
            onChange={(value) => setFilterColumn(value)}
          />
        </div>

        <div className="flex flex-col justify-center items-center col-span-3 w-[100%]">
          <label className='text-[14px] font-normal'>Searchbar</label>
          <SearchBar
            value={searchText}
            onChange={(value) => setSearchText(value)}
            placeholder={`Search`}
          />
        </div>
        <div className="w-[100%] h-[100%]">
          <button
            className="w-[100%] h-[100%] flex justify-center items-center align-middle"
            onClick={() => {
              setFilterColumn('');
              setFilterStatus('');
              setSearchText('');
            }}
          >
            <TrashIcon
              onMouseEnter={() => setEnter(true)}
              onMouseLeave={() => setEnter(false)}
              className="w-6 h-6 lg:w-7 lg:h-7 lg:hover:w-8 lg:hover:h-8 duration-100"
            />
          </button>
        </div>
      </div>

      <div className=" w-[90%] ">
        <div  style={{ height: 500, width: '100%' }}>
          <DataGrid
            sx={{
              boxShadow: 2,
              border: 2,
              backgroundColor : 'Background',
              borderRadius: 2,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell': {
                border: 1,
                borderColor: 'primary.main',
              },
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
            rows={filteredRows}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
            onEditCellChange={handleEditCellChange} // Handle cell editing
            className="border rounded shadow-md " // Apply Tailwind CSS styling
          />
        </div>
      </div>
    </div>
  );
}

export default Orders;
