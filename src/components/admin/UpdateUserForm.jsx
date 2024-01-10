import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { MdLockOutline, MdVisibility, MdVisibilityOff } from "react-icons/md";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ToastContainer, toast } from "react-toastify";
import { updateUser } from "../../helpers/helper";
import UserAvatar from "../../assets/images/avatar.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { getAllUsers } from "../../helpers/helper";

const UpdateUserForm = ({ user,onClose,setUsers }) => {
  
  const themeMode = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const serverLink = import.meta.env.VITE_SERVER_DOMAIN;

  const [userfile, setUserFile] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      mobileNumber: user.mobileNumber || "",
      username: user.username || "",
      email: user.email || "",
      profile:
        user.profile !== undefined &&
        user.profile !== "" &&
        serverLink + "/" + user.profile,
    },
    enableReinitialize: true,
    validate: validateProfileForm,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("mobileNumber", values.mobileNumber);
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("id", user._id);

        userfile &&
          URL.createObjectURL(userfile) &&
          formData.append("profile", userfile);

        let updatePromise = updateUser(formData);
        toast.promise(updatePromise, {
          pending: "Updating Profile...",
          success: "Profile Updated Successfully",
          error: "Error in Updating Profile",
        });

        updatePromise
          .then( async () => {
           console.log("Profile Updated Successfully");
           navigate('/admin', { replace: true });
           const data = await getAllUsers();
            setUsers(data.users);
           setTimeout(() => {
              onClose();
            }, 2000);
          })
          .catch((error) => {
            console.error("Error in Updating Profile:", error);
          });
      } catch (error) {
        console.error("Error in form submission:", error);
      }
    },
  });

  const onUploadAvatar = async (event) => {
    const fileSelected = event.target.files[0];
    setUserFile(fileSelected);
  };

  const handleAvatarClick = () => {
    document.getElementById("avatarInput").click();
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer
        autoClose={1000}
        theme={themeMode === "dark" ? "light" : "dark"}
      />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Profile
        </Typography>

        {/* Add other fields as needed */}
        {/* Avatar */}
        <Grid item xs={12} display="flex" justifyContent="center">
          <Avatar
            style={{
              bgcolor: "secondary.main",
              cursor: "pointer",
              width: "70px",
              height: "70px",
            }}
          >
            <img
              onClick={handleAvatarClick}
              crossOrigin="anonymous"
              src={
                (userfile && URL.createObjectURL(userfile)) ||
                formik.values.profile ||
                UserAvatar
              }
              loading="lazy"
              alt="Avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Avatar>
          <input
            type="file"
            id="avatarInput"
            name="avatar"
            onChange={onUploadAvatar}
            style={{ display: "none" }}
            accept="image/*"
          />
        </Grid>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
          encType="multipart/form-data"
        >
          <Grid container spacing={2}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                {...formik.getFieldProps("firstName")}
              />
            </Grid>
            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                {...formik.getFieldProps("lastName")}
              />
            </Grid>
            {/* Mobile Number */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mobile Number"
                fullWidth
                {...formik.getFieldProps("mobileNumber")}
              />
            </Grid>
            {/* Username */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Username"
                fullWidth
                {...formik.getFieldProps("username")}
              />
            </Grid>
            {/* Email */}
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                {...formik.getFieldProps("email")}
              />
            </Grid>
          </Grid>
          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateUserForm;

const validateProfileForm = (values) => {
  const errors = {};

  // Validate first name
  if (values.firstName && !values.firstName.trim()) {
    errors.firstName = "First Name is required";
  }

  // Validate last name
  if (values.lastName && !values.lastName.trim()) {
    errors.lastName = "Last Name is required";
  }

  // Validate username
  if (!values.username.trim()) {
    errors.username = "Username is required";
  }

  // Validate mobile number
  if (values.mobileNumber && !/^\d{10}$/.test(values.mobileNumber)) {
    errors.mobileNumber = "Mobile Number should be 10 digit numbers";
  }

  // Validate email
  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // Add additional validation rules as needed

  return errors;
};
