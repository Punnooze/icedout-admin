import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';

const rows = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 4, name: 'Bob Williams', email: 'bob@example.com' },
  // Add more rows as needed
];

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
];

const MyTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState('');
  const [filter, setFilter] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

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

  const renderCell = (params) => {
    return (
      <div>
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
    <div>
      <TextField
        label="Filter"
        variant="outlined"
        value={filter}
        onChange={handleFilterChange}
        style={{ marginBottom: '16px' }}
      />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          components={{
            Toolbar: GridToolbar,
          }}
          rows={rows}
          columns={[
            ...columns,
            {
              field: 'actions',
              headerName: 'Actions',
              sortable: false,
              width: 120,
              renderCell: renderCell,
            },
          ]}
        />
      </div>
      {/* Edit Modal */}
      <Dialog
        open={isEditModalOpen}
        onClose={closeModals}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Edit Row Details</DialogTitle>
        <div>
          {selectedRow && console.log(selectedRow) && (
            <div>
              {/* Display row details in the modal */}
              <p>Name: {selectedRow.name}</p>
              <p>Email: {selectedRow.email}</p>
              {/* Add other fields as needed */}
            </div>
          )}
        </div>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Button variant="outlined" onClick={closeModals}>
            Close
          </Button>
        </div>
      </Dialog>
      {/* Delete Modal */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={closeModals}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Row</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <div>
              {/* Display row details in the modal */}
              <p>Name: {selectedRow.name}</p>
              <p>Email: {selectedRow.email}</p>
              {/* Add other fields as needed */}
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
      </Dialog>
      {/* Email Modal */}
      <Dialog
        open={isEmailModalOpen}
        onClose={closeModals}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Email Row Details</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <div>
              {/* Display row details in the modal */}
              <p>Name: {selectedRow.name}</p>
              <p>Email: {selectedRow.email}</p>
              {/* Add other fields as needed */}
            </div>
          )}
          {/* Implement your email form or logic here */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<EmailIcon />}
            onClick={() => {
              // Implement email logic here
              console.log('Email clicked for row:', selectedRow);
              closeModals();
            }}
          >
            Email
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyTable;
