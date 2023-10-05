'use client';
import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SearchBar from './SearchBar';
import Select from './Select';

function CustomersCard({ data }) {
  const [searchText, setSearchText] = useState('');
  const [filterColumn, setFilterColumn] = useState('');
  const [filteredRows, setFilteredRows] = useState('');
  const [rows, setRows] = useState('');

  let count = 0;
  useEffect(() => {
    if (Array.isArray(data)) {
      const value = data.map((item) => {
        count++;
        return {
          ...item,
          id: count,
        };
      });
      setRows(value);
    }
  }, [data, count]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    }, // Allow editing
    { field: 'email', headerName: 'email', width: 150 },
    { field: 'whatsapp', headerName: 'Mobile Number', width: 150 },
  ];

  useEffect(() => {
    if (Array.isArray(rows)) {
      const filteredRows = rows.filter((row) => {
        return (
          !filterColumn ||
          String(row[filterColumn])
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );
      });
      if (filteredRows) setFilteredRows(filteredRows);
    }
  }, [rows, filterColumn, searchText]);

  return (
    <>
      <div className="w-[100vw] h-[100vh] overflow-y-auto flex flex-col">
        <h1 className="pl-6">Customers</h1>
        <div className="flex justify-center items-center h-[100vh]  w-[100%]">
          <div className=" w-[95%] h-[95%] bg-lightgrey rounded-md shadow-md ">
            <div className="grid grid-cols-2 gap-[20px] p-[10px]">
              <div className="w-[200px]">
                <Select
                  options={['', 'id', 'name', 'email', 'whatsapp']}
                  value={filterColumn}
                  onChange={(value) => setFilterColumn(value)}
                />
              </div>

              <SearchBar
                value={searchText}
                onChange={(value) => setSearchText(value)}
                placeholder={`Search`}
              />
            </div>
            <div className="flex justify-center items-center mt-[10px]">
              <div style={{ height: 500, width: '95%' }}>
                {filteredRows ? (
                  <DataGrid
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
                    rows={filteredRows}
                    columns={columns}
                    className="border rounded shadow-md "
                  />
                ) : (
                  <div>Loading..</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomersCard;
