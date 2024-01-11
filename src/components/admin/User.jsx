import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { getAllUsers, deleteUser } from "../../helpers/helper";
import { Button, TextField, Input } from "@mui/material";
import { useSelector } from "react-redux";
import UpdateUserModal from "./UpdateUserModal"; 
import CircularProgress from '@mui/material/CircularProgress';

const User = () => {
  const theme = useSelector((state) => state.theme.mode);
  const [users, setUsers] = useState([]);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const tableRef = useRef(null);

  useEffect(() => {
    console.log("Fetching users...");
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setUpdateModalOpen(true);
  };

  const handleDeleteUser = async (user) => {
    try {
      await deleteUser(user._id);
      fetchUsers();
      Swal.fire({
        title: "Deleted!",
        text: `User with email: ${user.email} has been deleted.`,
        icon: "success",
        confirmButtonColor: "#28a745",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the user. Please try again.",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setUpdateModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete the user with email: ${user.email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(user);
      }
    });
  };

  const columns = [
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{display:'flex', gap:"10px"}}>
          <Button variant="contained" color="secondary" onClick={() => handleUpdate(row)}>Update</Button>
          <Button variant="contained" color="warning" onClick={() => handleDelete(row)}>Delete</Button>
        </div>
      ),
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ wordWrap: "break-word", marginTop: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "10px", width: "30%" }}
        />

        {/* <Button style={{ marginBottom: "10px",  }} variant="contained" color="success" >Export</Button> */}
      </div>
      {isUpdateModalOpen && selectedUser && (
        <UpdateUserModal
          isOpen={isUpdateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          // onUpdate={handleUpdateFormSubmit}
          setUsers={setUsers}
          user={selectedUser}
        />
      )}

      <DataTable
  columns={columns}
  data={filteredUsers}
  responsive
  theme={theme}
  fixedHeader
  fixedHeaderScrollHeight="450px"
  pagination
  progressPending={!users.length}
  highlightOnHover
  paginationPerPage={10}
  paginationRowsPerPageOptions={[10, 25, 50, 100]}
  paginationComponentOptions={{
    rowsPerPageText: "Rows per page:",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
  }}
/>
    </div>
  );
};

export default User;
