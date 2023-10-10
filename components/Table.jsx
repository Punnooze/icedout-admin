import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import '../styles/globals.css';

import { IconButton, Menu, MenuItem, Dialog } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { XMarkIcon } from '@heroicons/react/24/solid';

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
    headerName: 'ID',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: '_id',
    headerName: 'Order ID',
    width: 150,
    headerClassName: 'custom-header',
  },

  {
    field: 'user',
    headerName: 'User ID',
    width: 150,
    headerClassName: 'custom-header',
  },
  {
    field: 'createdAt',
    headerName: 'Date',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'paymentMethod',
    headerName: 'Payment Method',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'isPaid',
    headerName: 'Payment Status',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'status',
    headerName: 'Order Status',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'shippingPrice',
    headerName: 'Shipping Price',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'couponDiscount',
    headerName: 'Discount',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'totalPrice',
    headerName: 'Total Price',
    width: 100,
    headerClassName: 'custom-header',
  },
  {
    field: 'trackingLink',
    headerName: 'Tracking Link',
    width: 100,
    headerClassName: 'custom-header',
  },
];

const MyTable = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filter, setFilter] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [rowsa, setRowsa] = useState({
    _id: null,
    createdAt: null,
    isPaid: null,
    orderItems: [
      {
        image: null,
        price: null,
        quantity: null,
        sku: null,
        _id: null,
      },
    ],
    paymentMethod: null,
    paymentResult: {
      id: null,
      status: null,
    },
    shippingAddress: {
      address: null,
      city: null,
      country: null,
      email: null,
      firstName: null,
      lastName: null,
      mobile: null,
      pincode: null,
      state: null,
    },
    shippingPrice: null,
    status: null,
    totalPrice: null,
    updatedAt: null,
    user: null,
    couponDiscount: null,
    trackingLink: null,
  });
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [status, setStatus] = useState(null);
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState(null);
  const [row, setRow] = useState(null);
  useEffect(() => {
    // if (rowsa && selectedRow) {
    //   console.log('both');
    //   if (rowsa !== selectedRow) {
    //     console.log('not equal');
    //   } else {
    //     console.log('equal');
    //   }
    // }
    if (selectedRow) {
      setRowsa(selectedRow);
      if (selectedRow.paymentResult)
        setPaymentStatus(selectedRow.paymentResult);
      // setRowsa({
      //   ...rowsa,
      //   ...selectedRow,
      //   createdAt: selectedRow.createdAt.slice(0, 10),
      // });
      // if (rowsa) console.log('rowsa ', rowsa);
    }
  }, [selectedRow, rowsa]);

  // useEffect(() => {
  //   if (rowsa) console.log('rowsa  : ', rowsa);
  // }, [rowsa]);

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

  const openDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirmed = () => {
    console.log('delete');

    setIsDeleteConfirmationOpen(false);
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  let count = 0;
  useEffect(() => {
    if (Array.isArray(data)) {
      const value = data.map((item) => {
        count++;
        const created = item.createdAt.slice(0, 10);
        return {
          ...item,
          id: count,
          createdAt: created,
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
          <MenuItem onClick={handleEditClick}>View more</MenuItem>
          {/* <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
          <MenuItem onClick={handleEmailClick}>Email</MenuItem> */}
        </Menu>
      </div>
    );
  };

  return (
    <>
      {row ? (
        <div className=" tw-bg-darkergrey tw-rounded-md tw-shadow-md tw-w-[80vw] md:tw-w-[60-vw] tw-p-[5px] tw-overflow-y-auto tw-md:p-[15px] ">
          {row && (
            <ThemeProvider theme={theme}>
              <div className="tw-h-[75vh]">
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
                    // console.log(e.row);
                    setSelectedRow(e.row);
                  }}
                />
              </div>
            </ThemeProvider>
          )}

          <Dialog open={isEditModalOpen} onClose={closeModals} maxWidth="xs">
            {rowsa && (
              <div className="tw-bg-darkgrey tw-p-[15px] tw-w-[300px] md:tw-w-[400px]  ">
                <h3 className="tw-text-[20px] tw-text-teal tw-mb-[10px]">
                  Order : {rowsa._id}
                </h3>
                <XMarkIcon
                  onClick={closeModals}
                  className="tw-cursor-pointer tw-w-7 tw-h-7  tw-absolute tw-text-violet tw-font-medium tw-top-[15px] tw-right-[10px]"
                />
                <div>
                  <p className="tw-text-bluepurple">
                    User ID :
                    <span className="tw-text-lightgrey">{rowsa.user}</span>
                  </p>
                  <p className="tw-text-bluepurple">
                    Order Date :
                    <span className="tw-text-lightgrey">{rowsa.createdAt}</span>
                  </p>

                  <div className="tw-mt-[20px]">
                    <h4 className="tw-text-violet tw-mb-[10px]">
                      Order Details
                    </h4>
                    <ul>
                      {rowsa.orderItems.map((item, index) => (
                        <li className="tw-mb-[10px]" key={index}>
                          <p className="tw-text-bluepurple">
                            Image:{' '}
                            <span className="tw-text-lightgrey">
                              /{item.slug}
                            </span>
                          </p>
                          <p className="tw-text-bluepurple">
                            SKU:{' '}
                            <span className="tw-text-lightgrey">
                              {item.sku}
                            </span>
                          </p>
                          <p className="tw-text-bluepurple">
                            Quantity:{' '}
                            <span className="tw-text-lightgrey">
                              {item.quantity}
                            </span>
                          </p>
                          <p className="tw-text-bluepurple">
                            Price:{' '}
                            <span className="tw-text-lightgrey">
                              {item.price}
                            </span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <h4 className="tw-text-violet tw-mb-[10px]">
                    Payment Details
                  </h4>
                  <p className="tw-text-bluepurple">
                    Shipping Cost :{' '}
                    <span className="tw-text-lightgrey">
                      {rowsa.shippingPrice}
                    </span>
                  </p>
                  <p className="tw-text-bluepurple">
                    Coupon Discount :{' '}
                    <span className="tw-text-lightgrey">
                      {rowsa.couponDiscount}
                    </span>
                  </p>
                  <p className="tw-text-bluepurple">
                    Payment Method :{' '}
                    <span className="tw-text-lightgrey">
                      {rowsa.paymentMethod}
                    </span>
                  </p>
                  {paymentStatus && (
                    <p className="tw-text-bluepurple">
                      Payment Status :{' '}
                      <span className="tw-text-lightgrey">
                        {paymentStatus.status}
                      </span>
                    </p>
                  )}

                  <h4 className="tw-text-violet tw-mt-[10px]">Order Status</h4>
                  <select
                    className="tw-select tw-w-full tw-max-w-xs tw-bg-darkgrey  tw-border-violet tw-shadow-sm hover:tw-shadow-md tw-duration-200 tw-text-lightgrey tw-my-[10px] "
                    placeholder={rowsa.status}
                    onChange={(e) =>
                      setRowsa({ ...rowsa, status: e.target.value })
                    }
                  >
                    <option>Confirmed</option>
                    <option>Shipped</option>
                    <option>Out for delivery</option>
                    <option>Delivered</option>
                    <option>Failed</option>
                  </select>

                  <div>
                    <h4 className="tw-text-violet tw-my-[10px]">
                      Delivery Address
                    </h4>
                    <div className="tw-flex tw-flex-col">
                      <p className="tw-text-lightgrey">
                        {rowsa.shippingAddress.firstName}
                        {rowsa.shippingAddress.lastName}
                      </p>
                      <p className="tw-text-lightgrey">
                        {rowsa.shippingAddress.address},
                      </p>
                      <p className="tw-text-lightgrey">
                        {rowsa.shippingAddress.city},
                      </p>
                      <p className="tw-text-lightgrey">
                        {rowsa.shippingAddress.state},
                      </p>
                      <p className="tw-text-lightgrey">
                        {rowsa.shippingAddress.country} -
                        {rowsa.shippingAddress.pincode}
                      </p>
                      <p className="tw-text-lightgrey">
                        {rowsa.shippingAddress.mobile}
                      </p>
                      <p className="tw-text-lightgrey">
                        {rowsa.shippingAddress.email}
                      </p>
                    </div>
                  </div>
                  <h4 className="tw-text-violet tw-my-[10px]">
                    Order Tracking Link
                  </h4>
                  <input
                    onChange={(e) =>
                      setRowsa({ ...rowsa, trackingLink: e.target.value })
                    }
                    className="tw-p-[7px] tw-w-[100%] tw-text-lightgrey tw-bg-darkergrey tw-rounded-md tw-outline-none tw-border tw-border-violet tw-shadow-sm hover:tw-shadow-md tw-duration-200 tw-text-[16px]"
                    type="text"
                    placeholder="Paste Tracking Link"
                  />
                </div>

                <div
                  className="tw-w-[100%] tw-mt-[15px] tw-flex tw-justify-around tw-bg-darkgrey"
                  style={{ padding: '16px', textAlign: 'center' }}
                >
                  {/* <button
                    className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] "
                    onClick={closeModals}
                  >
                    Close
                  </button> */}
                  <button
                    // onClick={handleSave}
                    className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] "
                  >
                    Save
                  </button>
                  <button
                    onClick={openDeleteConfirmation}
                    // onClick={handleSave}
                    className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] "
                  >
                    Delete
                  </button>
                  <button
                    // onClick={handleSave}
                    className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] "
                  >
                    Email
                  </button>
                </div>
              </div>
            )}
          </Dialog>

          <Dialog
            open={isDeleteConfirmationOpen}
            onClose={closeDeleteConfirmation}
            maxWidth="xs"
          >
            <div className="tw-bg-darkgrey tw-p-[15px]">
              <h2 className="tw-text-bluepurple">Confirm Deletion</h2>
              <h4 className="tw-text-lightgrey tw-mb-[30px]">
                Are you sure you want to delete this order?
              </h4>
              <div className="tw-w-[100%] tw-mt-[15px] tw-flex tw-justify-around ">
                <button
                  onClick={closeDeleteConfirmation}
                  className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] "
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirmed}
                  className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] "
                >
                  Confirm
                </button>
              </div>
            </div>
          </Dialog>

          {/* 
          <Dialog open={isDeleteModalOpen} onClose={closeModals} maxWidth="xs">
            <div className="tw-bg-darkgrey tw-p-[15px] tw-w-[300px]">
              <h3 className="tw-text-[20px] tw-text-teal tw-mb-[10px]">
                Delete Order
              </h3>
              {name && email && (
                <div>
                  <h6 className="tw-text-lightgrey tw-font">User Details :</h6>
                  <p className="tw-text-bluepurple">
                    Name : <span className="tw-text-lightgrey">{name}</span>
                  </p>
                  <p className="tw-text-bluepurple">
                    Email : <span className="tw-text-lightgrey">{email}</span>
                  </p>
                  <h6 className="tw-text-lightgrey tw-font">Order Details :</h6>
                  <p className="tw-text-bluepurple">
                    Order id :{' '}
                    <span className="tw-text-lightgrey">6ZerFrj</span>
                  </p>
                  <p className="tw-text-bluepurple">
                    Order Status :{' '}
                    <span className="tw-text-lightgrey">Delivered</span>
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
                  <p className="tw-text-bluepurple">
                    Name : <span className="tw-text-lightgrey">{name}</span>
                  </p>
                  <p className="tw-text-bluepurple">
                    Email : <span className="tw-text-lightgrey">{email}</span>
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
          </Dialog> */}

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
