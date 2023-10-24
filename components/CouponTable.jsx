'use client';
import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { Dialog, IconButton, Menu, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import {
  PencilIcon,
  XMarkIcon,
  TagIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/outline';

// let rows = [
//   { id: 143, CID: 'FIRST5', CNAME: 'Coupon 1', EXP: '25/8/2023' },
//   { id: 223, CID: 'QASIM5', CNAME: 'Coupon 2', EXP: '8/11/2023' },
//   { id: 353, CID: 'TAYGAY', CNAME: 'Coupon 3', EXP: '10/11/2023' },
//   // Add more rows
// ];

// const columns = [
//   { field: 'CID', headerName: 'Coupon ID', width: 150 },
//   { field: 'CNAME', headerName: 'Coupon Name', width: 200 },
//   { field: 'EXP', headerName: 'Expiry', width: 150 },
//   // Add more columns
// ];

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName: 'custom-header',
    width: 60,
  },
  {
    field: 'couponID',
    headerName: 'Coupon ID',
    headerClassName: 'custom-header',
    width: 150,
  },
  {
    field: 'couponName',
    headerName: 'Coupon Name',
    width: 150,
    headerClassName: 'custom-header',
  },
  {
    field: 'expiry',
    headerName: 'Expiry Date',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'flatDiscount',
    headerName: 'Discount',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'percentage',
    headerName: 'Percentage',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'percentageDiscount',
    headerName: 'Perc Discount',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'deliveryFree',
    headerName: 'Free Delivery',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'minPurchase',
    headerName: 'Min Purchase',
    width: 100,
    headerClassName: 'custom-header',
  },
];

function CouponTable({ data }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const [rowsa, setRowsa] = useState({
    _id: null,
    couponName: '',
    couponID: '',
    expiry: '',
    percentage: false,
    percentageDiscount: '',
    flatDiscout: '',
    minPurchase: '',
    deliveryFee: true,
  });
  const [row, setRow] = useState(null);

  useEffect(() => {
    if (selectedRow) {
      setRowsa(selectedRow);
    }
  }, [selectedRow, rowsa]);

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const openDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(true);
    handleMenuClose();
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#bb86fc', // Color for GridToolbar icons
      },
      secondary: {
        main: '#363535', // Background color for column header
      },
    },
  });

  let count = 0;
  useEffect(() => {
    if (Array.isArray(data)) {
      const value = data.map((item) => {
        count++;
        return {
          ...item,
          id: count,
          expiry: item.expiry.slice(0, 10),
        };
      });
      setRow(value);
    }
  }, [data, count]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/coupon', {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: rowsa }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.message == 'Successfully Deleted') {
          window.location.reload();
        } else alert(data.data);
      } else {
        console.log('Error:', res.statusText);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const renderCell = (params) => {
    return (
      <div className="tw-w-[100%] tw-h-[100%]">
        <IconButton
          aria-label="actions"
          onClick={(e) => handleMenuOpen(e, params.row)}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem>
            <Link
              className="tw-flex tw-justify-center tw-items-center"
              href={{
                pathname: '/couponEdit',
                query: {
                  id: selectedRow ? selectedRow._id : null,
                },
              }}
            >
              Edit
            </Link>
          </MenuItem>
          <MenuItem onClick={openDeleteConfirmation}>Delete</MenuItem>
        </Menu>
      </div>
    );
  };

  const router = useRouter();
  return (
    <>
      <div className="tw-h-[100vh] tw-ml-[70px] tw-bg-background tw-overflow-y-auto tw-overflow-x-hidden">
        <div className="tw-h-[90vh] tw-flex tw-flex-col tw-items-center tw-align-middle">
          <div className="lg:tw-px-[40px] tw-w-full tw-flex tw-justify-around lg:tw-justify-between tw-p-[5px] ">
            <h1 className="tw-hidden md:tw-block tw-text-darkergrey md:tw-ml-[20px] tw-mr-[20px] tw-[10vh] md:tw-mr-[40px]">
              COUPONS PAGE
            </h1>
            <h1 className="md:tw-hidden tw-text-darkergrey md:tw-ml-[20px] tw-mr-[20px] tw-[10vh] md:tw-mr-[40px]">
              COUPONS
            </h1>
            <div className="tw-flex tw-justify-center tw-items-center ">
              <button
                className="hover:tw-bg-violet tw-flex tw-justify-center tw-items-center tw-p-[10px] tw-rounded-md tw-text-violet hover:tw-text-background tw-border-[2px] tw-border-violet"
                onClick={() => router.push('/couponinput')}
              >
                <PlusIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                <p className="md:tw-hidden tw-text-[14px] md:tw-text-[16px]">
                  Create
                </p>
                <p className="tw-hidden md:tw-block tw-text-[14px] md:tw-text-[16px]">
                  Create Coupon
                </p>
              </button>
            </div>
          </div>
          <div className="tw-flex tw-justify-center tw-items-center tw-h-[100vh]  tw-w-[100%]">
            <div className=" tw-w-[80vw] lg:tw-w-[65vw] tw-h-[85vh] tw-bg-darkergrey tw-rounded-md tw-shadow-md tw-p-[5px] tw-flex tw-justify-center tw-items-center tw-align-middle ">
              {row && (
                <ThemeProvider theme={theme}>
                  <DataGrid
                    components={{
                      Toolbar: GridToolbar,
                    }}
                    rows={row}
                    columns={[
                      ...columns,
                      {
                        field: 'actions',
                        headerName: 'Actions',
                        sortable: false,
                        width: 100,
                        headerClassName: 'custom-header',
                        renderCell: renderCell,
                      },
                    ]}
                    // columns={columns}
                    className="data-grid"
                    toolbarClassName="custom-toolbar"
                    classes={{
                      selected: 'selected-row',
                      scrollArea: 'custom-scrollbar',
                    }}
                    sx={{
                      border: 2,
                      '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                      },
                      '& .MuiDataGrid-cell': {
                        border: 1,
                        borderRight: 0,
                        borderTop: 0,
                        borderColor: '#363535',
                      },
                      borderColor: '#363535',
                    }}
                    onRowClick={(e) => {
                      setSelectedRow(e.row);
                    }}
                  />
                </ThemeProvider>
              )}
            </div>

            <Dialog
              open={isDeleteConfirmationOpen}
              onClose={closeDeleteConfirmation}
              maxWidth="xs"
            >
              <div className="tw-bg-darkgrey tw-p-[15px]">
                <br />
                <h2 className="tw-text-violet">
                  Are you sure you want to delete this coupon
                </h2>
                <br />
                <p className="tw-text-lightgrey tw-text-[14px]">
                  Coupon ID :{' '}
                  <span className="tw-text-teal tw-text-[15px]">
                    {rowsa.couponID}
                  </span>
                </p>
                <p className="tw-text-lightgrey tw-text-[14px]">
                  Coupon Name :{' '}
                  <span className="tw-text-teal tw-text-[15px]">
                    {rowsa.couponName}
                  </span>
                </p>
                <p className="tw-text-lightgrey tw-text-[14px]">
                  Expiring on :{' '}
                  <span className="tw-text-teal tw-text-[15px]">
                    {rowsa.expiry.slice(0, 10)}
                  </span>
                </p>
                <br />
                <div className="tw-w-[100%] tw-mt-[10px] tw-flex tw-justify-around ">
                  <button
                    onClick={closeDeleteConfirmation}
                    className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] tw-flex tw-items-center tw-mr-[5px] md:tw-mr-[0px]"
                  >
                    <XMarkIcon className="tw-w-5- tw-h-5 tw-mr-[5px]" />
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] tw-flex tw-items-center"
                  >
                    <TrashIcon className="tw-w-5- tw-h-5 tw-mr-[5px]" />
                    Delete
                  </button>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}

export default CouponTable;
