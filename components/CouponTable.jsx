'use client';
import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';

let rows = [
  { id: 143, CID: 'FIRST5', CNAME: 'Coupon 1', EXP: '25/8/2023' },
  { id: 223, CID: 'QASIM5', CNAME: 'Coupon 2', EXP: '8/11/2023' },
  { id: 353, CID: 'TAYGAY', CNAME: 'Coupon 3', EXP: '10/11/2023' },
  // Add more rows
];

const columns = [
  { field: 'CID', headerName: 'Coupon ID', width: 150 },
  { field: 'CNAME', headerName: 'Coupon Name', width: 200 },
  { field: 'EXP', headerName: 'Expiry', width: 150 },
  // Add more columns
];

function CouponTable({ data }) {
  const router = useRouter();
  const [click, setClick] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterColumn, setFilterColumn] = useState('');
  const [searchText, setSearchText] = useState('');

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
    <div className="tw-flex tw-flex-col tw-h-screen tw-ml-[70px] tw-w-[100%] tw-bg-grey tw-justify-center tw-items-center tw-align-middle">
      <div className="tw-mt-4 tw-grid tw-grid-cols-2 tw-align-self tw-gap-4">
        <h1 className="tw-col-span-1">COUPON TABLE</h1>
        <div className="tw-col-span-1 tw-flex tw-justify-end">
          <button
            onClick={() => router.push('/couponinput')}
            className="tw-btn tw-btn-primary tw-rounded"
          >
            Add coupon
          </button>
        </div>
      </div>
      <div className="tw-w-[90%]">
        <div style={{ height: 500}}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
            className="tw-border tw-rounded tw-shadow-md tw-bg-white"
            getCellClassName={(params) => {
              return `custom-cell ${params.field}`;
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CouponTable;
