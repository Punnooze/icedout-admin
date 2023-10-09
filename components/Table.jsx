import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/globals.css';

import {
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogContentText,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import { teal } from '@mui/material/colors';
import { DialogBody } from '@material-tailwind/react';
import { TrashIcon } from '@heroicons/react/24/solid';

const rows = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 4, name: 'Bob Williams', email: 'bob@example.com' },
  // Add more rows as needed
];

// const columns = [
//   { field: 'id', headerName: 'Id', width: 100 },
//   { field: 'firstName', headerName: 'First Name', width: 100 },
//   { field: 'lastName', headerName: 'Last Name', width: 100 },
//   { field: 'email', headerName: 'Email', width: 100 },
//   { field: 'city', headerName: 'City', width: 100 },
//   { field: 'state', headerName: 'State', width: 100 },
//   { field: 'city', headerName: 'City', width: 100 },
//   { field: 'city', headerName: 'City', width: 100 },
// ];

// const columns = [
//   {
//     field: 'id',
//     headerName: 'Id',
//     width: 100,
//     headerClassName: 'super-app-theme--header bg-gray-700',
//   },
//   {
//     field: 'firstName',
//     headerName: 'First Name',
//     width: 100,
//     headerClassName: 'super-app-theme--header bg-gray-700',
//   },
//   {
//     field: 'lastName',
//     headerName: 'Last Name',
//     width: 100,
//     headerClassName: 'super-app-theme--header bg-gray-700',
//   },
//   {
//     field: 'email',
//     headerName: 'Email',
//     width: 100,
//     headerClassName: 'super-app-theme--header bg-gray-700',
//   },
//   {
//     field: 'city',
//     headerName: 'City',
//     width: 100,
//     headerClassName: 'super-app-theme--header bg-gray-700',
//   },
//   {
//     field: 'state',
//     headerName: 'State',
//     width: 100,
//     headerClassName: 'super-app-theme--header bg-gray-700',
//   },
//   {
//     field: 'city',
//     headerName: 'City',
//     width: 100,
//     headerClassName: 'super-app-theme--header bg-gray-700',
//   },
//   {
//     field: 'city',
//     headerName: 'City',
//     width: 100,
//     headerClassName: 'super-app-theme--header bg-gray-700',
//   },
// ];

// const columns = [
//   {
//     field: 'id',
//     headerName: 'Id',
//     width: 100,
//     headerClassName: 'super-app-theme--header',
//   },
//   {
//     field: 'firstName',
//     headerName: 'First Name',
//     width: 100,
//     headerClassName: 'super-app-theme--header',
//   },
//   {
//     field: 'lastName',
//     headerName: 'Last Name',
//     width: 100,
//     headerClassName: 'super-app-theme--header',
//   },
//   {
//     field: 'email',
//     headerName: 'Email',
//     width: 100,
//     headerClassName: 'super-app-theme--header',
//   },
//   {
//     field: 'city',
//     headerName: 'City',
//     width: 100,
//     headerClassName: 'super-app-theme--header',
//   },
//   {
//     field: 'state',
//     headerName: 'State',
//     width: 100,
//     headerClassName: 'super-app-theme--header',
//   },
//   {
//     field: 'city',
//     headerName: 'City',
//     width: 100,
//     headerClassName: 'super-app-theme--header',
//   },
//   {
//     field: 'city',
//     headerName: 'City',
//     width: 100,
//     headerClassName: 'super-app-theme--header',
//   },
// ];

const columns = [
  {
    field: 'id',
    headerName: 'Id',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'firstName',
    headerName: 'First Name',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 100,
    headerClassName: 'custom-header',
  },
  // {
  //   field: 'city',
  //   headerName: 'City',
  //   width: 100,
  //   headerClassName: 'custom-header',
  // },
  {
    field: 'state',
    headerName: 'State',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'city',
    headerName: 'City',
    width: 100,
    headerClassName: 'custom-header',
  },
  // {
  //   field: 'city',
  //   headerName: 'City',
  //   width: 100,
  //   headerClassName: 'custom-header',
  // },
  // {
  //   field: 'actions',
  //   headerName: 'Actions',
  //   sortable: false,
  //   width: 120,
  //   renderCell: renderCell,
  // },
];

const MyTable = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filter, setFilter] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [newName, setNewName] = useState(null);
  const [row, setRow] = useState(null);
  useEffect(() => {
    if (selectedRow) {
      setName(selectedRow.firstName);
      setEmail(selectedRow.email);
      console.log(selectedRow.firstName, selectedRow.email);
    }
  }, [selectedRow]);

  useEffect(() => {
    if (newName) console.log('name changed to : ', newName);
  }, [newName]);

  // const headerStyles = {
  //   backgroundColor: '#4f4f4f',
  //   color: 'white',
  // };

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

  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: '#bb86fc', // Set the DataGrid toolbar color
  //     },
  //   },
  // overrides: {
  //   MuiDataGrid: {
  //     root: {
  //       border: '1px solid #4f4f4f',
  //       fontFamily: 'Poppins, sans-serif',
  //     },
  //     colCell: {
  //       backgroundColor: '#4f4f4f',
  //       color: 'white',
  //       fontWeight: 'bold',
  //     },
  //     row: {
  //       borderBottom: '1px solid #b7b8ba',
  //     },
  //     window: {
  //       '&::-webkit-scrollbar': {
  //         width: '12px',
  //       },
  //       '&::-webkit-scrollbar-track': {
  //         background: '#1f1f1f',
  //       },
  //       '&::-webkit-scrollbar-thumb': {
  //         backgroundColor: '#9081e5',
  //         borderRadius: '6px',
  //       },
  //     },
  //   },
  // },
  // });

  const handleMenuOpen = (event, row) => {
    // console.log(row);
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const openEmailModal = () => {
    setIsEmailModalOpen(true);
  };

  const closeModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsEmailModalOpen(false);
  };

  const handleEditClick = () => {
    openEditModal();
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    openDeleteModal();
    handleMenuClose();
  };

  const handleEmailClick = () => {
    openEmailModal();
    handleMenuClose();
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

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
  // console.log(row);

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
          <MenuItem onClick={handleEditClick}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
          <MenuItem onClick={handleEmailClick}>Email</MenuItem>
        </Menu>
      </div>
    );
  };

  return (
    <>
      {row ? (
        <div className=" tw-bg-darkergrey tw-rounded-md tw-shadow-md tw-w-[80vw] tw-md:w-[90vw] tw-p-[5px] tw-md:p-[15px] ">
          {row && (
            // <ThemeProvider theme={theme}>
            //   <CssBaseline />
            //  <div className="tw-text-[12px]" style={{ height: 400 }}>
            //   <DataGrid
            //     components={{
            //       Toolbar: GridToolbar,
            //     }}
            //     rows={row}
            //     columns={[
            //       ...columns,
            //       {
            //         field: 'actions',
            //         headerName: 'Actions',
            //         sortable: false,
            //         width: 120,
            //         renderCell: renderCell,
            //       },
            //     ]}
            // className="border border-teal font-poppins"
            // sx={{
            //   boxShadow: 5,
            //   border: 2,
            //   borderColor: '#03dac6',
            //   '$ .MuiDataGrid-Cell': {
            //     backgroundColor: '#4f4f4f',
            //     color: '#ffffff',
            //   },
            // }}
            //   />
            // </div> */}
            <ThemeProvider theme={theme}>
              <div style={{ height: '75vh' }}>
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
                  //columns={columns}
                  className="data-grid"
                  toolbarClassName="custom-toolbar"
                  classes={{
                    selected: 'selected-row', // Apply the row selection color
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
                    // columnRuleColor: '#363535',
                  }}
                  onRowClick={(e) => {
                    console.log(e.row);
                    setSelectedRow(e.row);
                  }}
                />
              </div>
            </ThemeProvider>
          )}
          <Dialog open={isEditModalOpen} onClose={closeModals} maxWidth="xs">
            <div className="tw-bg-darkgrey tw-p-[15px] tw-w-[300px] ">
              <h3 className="tw-text-[20px] tw-text-teal tw-mb-[10px]">
                Edit Order Status
              </h3>
              <h5 className="tw-text-lightgrey">Change Status : </h5>
              <div className="tw-bg-darkgrey ">
                {name && email && (
                  <div>
                    <select
                      className="tw-select tw-w-full tw-max-w-xs tw-border tw-border-violet focus:tw-border-[2px] tw-bg-darkergrey tw-shadow-sm hover:tw-shadow-md tw-duration-200 tw-text-lightgrey tw-my-[10px] "
                      placeholder={name}
                      onChange={(e) => setNewName(e.target.value)}
                    >
                      <option>{name}</option>
                      <option>john</option>
                      <option>Maggie</option>
                    </select>
                  </div>
                )}
              </div>
              <div
                className="tw-w-[100%] tw-flex tw-justify-around tw-bg-darkgrey"
                style={{ padding: '16px', textAlign: 'center' }}
              >
                <button
                  className="tw-border-2 tw-border-bluepurple tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] "
                  onClick={closeModals}
                >
                  Close
                </button>
                <button
                  className={`tw-border-2 tw-border-bluepurple tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px]  ${
                    newName === null ? 'tw-hidden' : 'tw-visible'
                  }`}
                >
                  Save
                </button>
              </div>
            </div>
          </Dialog>

          <Dialog open={isDeleteModalOpen} onClose={closeModals} maxWidth="xs">
            <div className="tw-bg-darkgrey tw-p-[15px] tw-w-[300px]">
              <h3 className="tw-text-[20px] tw-text-teal tw-mb-[10px]">
                Delete Order
              </h3>
              {name && email && (
                <div>
                  <h6 className="tw-text-lightgrey tw-font">User Details :</h6>
                  <p className="tw-text-grey">
                    Name : <span className="tw-text-bluepurple">{name}</span>
                  </p>
                  <p className="tw-text-grey">
                    Email : <span className="tw-text-bluepurple">{email}</span>
                  </p>
                  <h6 className="tw-text-lightgrey tw-font">Order Details :</h6>
                  <p className="tw-text-grey">
                    Order id :{' '}
                    <span className="tw-text-bluepurple">6ZerFrj</span>
                  </p>
                  <p className="tw-text-grey">
                    Order Status :{' '}
                    <span className="tw-text-bluepurple">Delivered</span>
                  </p>
                </div>
              )}
              <div
                className="tw-w-[100%] tw-flex tw-justify-around tw-bg-darkgrey"
                style={{ padding: '16px', textAlign: 'center' }}
              >
                <button
                  className="tw-border-2 tw-border-bluepurple tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] "
                  onClick={closeModals}
                >
                  Close
                </button>
                <button className="tw-border-2 tw-border-bluepurple tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px]">
                  Delete
                </button>
              </div>
            </div>
          </Dialog>

          <Dialog open={isEmailModalOpen} onClose={closeModals} maxWidth="xs">
            <div className="tw-bg-darkgrey tw-p-[15px] tw-w-[300px]">
              <h3 className="tw-text-[20px] tw-text-teal tw-mb-[10px]">
                Email User
              </h3>
              {name && email && (
                <div>
                  <h6 className="tw-text-lightgrey tw-font">User Details :</h6>
                  <p className="tw-text-grey">
                    Name : <span className="tw-text-bluepurple">{name}</span>
                  </p>
                  <p className="tw-text-grey">
                    Email : <span className="tw-text-bluepurple">{email}</span>
                  </p>
                </div>
              )}
              <div
                className="tw-w-[100%] tw-flex tw-justify-around tw-bg-darkgrey"
                style={{ padding: '16px', textAlign: 'center' }}
              >
                <button
                  className="tw-border-2 tw-border-bluepurple tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] "
                  onClick={closeModals}
                >
                  Close
                </button>
                <button className="tw-border-2 tw-border-bluepurple tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px]">
                  Email
                </button>
              </div>
            </div>
          </Dialog>

          {/* <Dialog
            open={isDeleteModalOpen}
            onClose={closeModals}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle>Delete Row</DialogTitle>
            <DialogContent>
              {name && email && (
                <div>
                  <p>Name: {name}</p>
                  <p>Email: {email}</p>
                </div>
              )}
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  // Implement delete logic here
                  console.log('Delete clicked for row:', selectedRow);
                  closeModals();
                }}
              >
                Delete
              </Button>
            </DialogContent>
          </Dialog> */}

          {/* <Dialog
            open={isEmailModalOpen}
            onClose={closeModals}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle>Email Row Details</DialogTitle>
            <DialogContent>
              {selectedRow && (
                <div>
                  <p>Name: {selectedRow.name}</p>
                  <p>Email: {selectedRow.email}</p>
                </div>
              )}

              <Button
                variant="contained"
                color="primary"
                startIcon={<EmailIcon />}
                onClick={() => {
                  console.log('Email clicked for row:', selectedRow);
                  closeModals();
                }}
              >
                Email
              </Button>
            </DialogContent>
          </Dialog> */}
        </div>
      ) : null}
    </>
  );
};

export default MyTable;
