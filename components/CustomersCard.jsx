'use client';
import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SearchBar from './SearchBar';
import Select from './Select';

function CustomersCard({ data }) {
  const [searchText, setSearchText] = useState('');
  const [filterColumn, setFilterColumn] = useState('');
  const rows = data;
  //    [
  //     {
  //       id: 1,
  //       name: 'Punnoose',
  //       age: 20,
  //     },
  //     {
  //       id: 2,
  //       name: 'thejas',
  //       age: 20,
  //     },
  //     {
  //       id: 3,
  //       name: 'Punnoose',
  //       age: 20,
  //     },
  //     {
  //       id: 4,
  //       name: 'wasimf',
  //       age: 20,
  //     },
  //   ];

  console.log(data);
  console.log(rows);

  const columns = [
    { field: 'userId', headerName: 'User Id', width: 100 },
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 150,
      editable: true,
    }, // Allow editing
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'mobile', headerName: 'Mobile Number', width: 150 },
    // Add more columns
  ];

  //   if (rows) {
  //     const filteredRows = rows.filter((row) => {
  //       return (
  //         !filterColumn ||
  //         String(row[filterColumn])
  //           .toLowerCase()
  //           .includes(searchText.toLowerCase())
  //       );
  //     });
  //   }

  return (
    <>
      <div className="w-[100vw] h-[100vh] overflow-y-auto flex flex-col">
        <h1 className="pl-6">Customers</h1>
        <div className="flex justify-center items-center h-[100vh]  w-[100%]">
          <div className=" w-[95%] h-[95%] bg-lightgrey rounded-md shadow-md ">
            <Select
              options={['', 'id', 'name', 'age']}
              value={filterColumn}
              onChange={(value) => setFilterColumn(value)}
            />
            <SearchBar
              value={searchText}
              onChange={(value) => setSearchText(value)}
              placeholder={`Search`}
            />
            <div className=" w-[90%] ">
              <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                  getRowId={(row) => row.userId}
                  sx={{
                    boxShadow: 2,
                    border: 2,
                    backgroundColor: 'Background',
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
                  rows={rows}
                  columns={columns}
                  //   components={{
                  //     Toolbar: GridToolbar,
                  //   }}
                  //   onEditCellChange={handleEditCellChange} // Handle cell editing
                  className="border rounded shadow-md " // Apply Tailwind CSS styling
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomersCard;
