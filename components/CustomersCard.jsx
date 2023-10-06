import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SearchBar from './SearchBar';
import Select from './Select';
import { TrashIcon } from '@heroicons/react/24/solid';

function CustomersCard({ data }) {
  const [searchText, setSearchText] = useState('');
  const [filterColumn, setFilterColumn] = useState('');
  const [filteredRows, setFilteredRows] = useState('');
  const [rows, setRows] = useState('');
  const [selectedRow, setSelectedRow] = useState(null); // Define selectedRow as a state variable\
  const [click, setClick] = useState(true);
  const [dlt, setDlt] = useState(false);

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
      width: 200,
      editable: true,
    },
    { field: 'email', headerName: 'email', width: 200 },
    { field: 'whatsapp', headerName: 'Mobile Number', width: 200 },
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
      <div className="ml-[70px] bg-background h-[100vh] overflow-y-auto flex flex-col">
        <h1 className="pl-6">Customers</h1>
        <div className="flex justify-center items-center h-[100vh]  w-[100%]">
          <div className=" w-[95%] h-[95%] bg-darkergrey rounded-md shadow-md ">
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
            {selectedRow && click && (
              <button onClick={() => setDlt(!dlt)}>
                <TrashIcon className="w-5 h-6" />
              </button>
            )}

            {dlt && (
              <div className="absolute z-30 bg-grey inset-[40%] w-[300px] h-[300px]">
                <p>Delete details of {selectedRow.name}</p>
                <p>press to confirm</p>
                <button>
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            )}

            <div
              className="flex justify-center items-center mt-[10px]"
              // onClick={() => setSelectedRow(null)}
            >
              <div style={{ height: 500, width: '90%' }}>
                {filteredRows ? (
                  <DataGrid
                    sx={{
                      boxShadow: 2,
                      border: 2,
                      backgroundColor: '#363535',
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
                    onRowClick={(e) => {
                      if (selectedRow === e.row) {
                        setClick(!click);
                      } else {
                        setSelectedRow(e.row);
                        setClick(true);
                        // Set the selected row
                      }
                    }}
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
