import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { MdClose } from "react-icons/md";
import Button from "@mui/material/Button";
import UpdateUserForm from "./UpdateUserForm"; // Import the UpdateUserForm

const UpdateUserModal = ({ isOpen, onClose, onUpdate, user,setUsers }) => {
  const handleUpdateFormSubmit = (updatedUser) => {
    // Call the onUpdate function with the updated user data
    onUpdate(updatedUser);
    // Close the modal
    onClose();
  };

  const handleModalClose = () => {
    // Close the modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleModalClose} fullWidth  >
      <DialogTitle display={'flex'} justifyContent={'space-between'}>
        Update User
            <IconButton onClick={handleModalClose} color="primary">
            <MdClose />
            </IconButton>
      </DialogTitle>
      <DialogContent dividers={true}>
        {/* Pass the user and submit callback to the UpdateUserForm */}
        <UpdateUserForm onClose={handleModalClose} user={user} onUpdate={handleUpdateFormSubmit} setUsers={setUsers} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateUserModal;
