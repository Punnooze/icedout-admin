import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import '../styles/globals.css';
import { IconButton, Menu, MenuItem, Dialog } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/outline';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName: 'custom-header',
    width: 100,
  },
  {
    field: '_id',
    headerName: 'User ID',
    headerClassName: 'custom-header',
    width: 150,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    headerClassName: 'custom-header',
  },
  {
    field: 'mobile',
    headerName: 'Mobile Number',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'whatsapp',
    headerName: 'Whatsapp Number',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 100,
    headerClassName: 'custom-header',
  },
];

function CustomersCard({ data }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [rowsa, setRowsa] = useState({
    _id: null,
    createdAt: null,
    email: null,
    mobile: null,
    name: null,
    password: null,
    updatedAt: null,
    whatsapp: null,
    whishlist: [null],
    _v: null,
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
        };
      });
      setRow(value);
    }
  }, [data, count]);

  const handleDelete = async () => {
    try {
      const res = await fetch('/api/deleteCustomer', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: rowsa }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.message === 'Successfully Deleted') {
          window.location.reload();
        }
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
          <MenuItem onClick={openDeleteConfirmation}>Delete</MenuItem>
        </Menu>
      </div>
    );
  };

  return (
    <>
      <div className="tw-h-[100vh] tw-ml-[70px] tw-bg-background tw-overflow-y-auto tw-overflow-x-hidden">
        <div className="tw-h-[90vh] tw-flex tw-flex-col tw-items-center tw-align-middle">
          <div className=" tw-ml-[70px] tw-w-[100%]">
            <h1 className=" tw-text-darkergrey md:tw-ml-[20px] tw-[10vh]">
              CUSTOMERS
            </h1>
          </div>
          <div className="tw-flex tw-justify-center tw-items-center tw-h-[100vh]  tw-w-[100%]">
            <div className=" tw-w-[80vw] lg:tw-w-[50vw] tw-h-[85vh] tw-bg-darkergrey tw-rounded-md tw-shadow-md tw-p-[5px] tw-flex tw-justify-center tw-items-center tw-align-middle ">
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
                <h2 className="tw-text-bluepurple">Confirm Deletion</h2>
                <h4 className="tw-text-lightgrey tw-mb-[30px]">
                  Are you sure you want to delete customer details of{' '}
                  <span className="tw-text-violet">{rowsa.name}</span>?
                </h4>
                <div className="tw-w-[100%] tw-mt-[15px] tw-flex tw-justify-around ">
                  <button
                    onClick={closeDeleteConfirmation}
                    className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] tw-flex "
                  >
                    <XMarkIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                    <p>Cancel</p>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] tw-flex"
                  >
                    <TrashIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                    <p>Confirm</p>
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

export default CustomersCard;
