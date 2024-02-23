import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { deleteUser, getAllDeletedUsers, revertDeletedUser } from "../../helpers/helper";
import { Button, TextField,Box } from "@mui/material";
import { useSelector } from "react-redux";
import UpdateUserModal from "./UpdateUserModal";
import CircularProgress from "@mui/material/CircularProgress";

const DeletedUser = () => {
  const theme = useSelector((state) => state.theme.mode);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllDeletedUsers();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteUser = async (user) => {
    try {
      await revertDeletedUser(user._id);
      fetchUsers();
      Swal.fire({
        title: "Reverted!",
        text: `User with email: ${user.email} has been reverted.`,
        icon: "success",
        confirmButtonColor: "#28a745",
      });
    } catch (error) {
      console.error("Error reverting user:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while reverting the user. Please try again.",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    } 
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to revert the user with email: ${user.email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Revert it!",
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
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(row)}
          >
            Revert
          </Button>
         
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
    <Box style={{ wordWrap: "break-word", marginTop: "10px" }}>
    <Box
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
    </Box>
  
    {filteredUsers.length === 0 ? (
      <Box>No users available</Box>
    ) : (
      <>
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
      </>
    )}
  </Box>
  );
};

export default DeletedUser;
