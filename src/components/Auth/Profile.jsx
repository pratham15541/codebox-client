import * as React from "react";
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
import { Link as ReactRouterDomLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import UserAvatar from "../../assets/images/avatar.png";
import useFetch from "../../hooks/fetch.hook";
import { updateUser } from "../../helpers/helper";

//image into base64

export default function Profile() {
  const themeMode = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const serverLink = import.meta.env.VITE_SERVER_DOMAIN;

  const [{ isLoading, apiData, serverError, status }] = useFetch();

  const [userfile, setUserFile] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.others.firstName || "",
      lastName: apiData?.others.lastName || "",
      mobileNumber: apiData?.others.mobileNumber || "",
      username: apiData?.others.username || "",
      email: apiData?.others.email || "",
      profile:
        apiData?.others.profile !== undefined &&
        apiData?.others.profile !== "" &&
        serverLink + "/" + apiData?.others.profile,
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
        formData.append("id", apiData?.others._id);
       
        (userfile && URL.createObjectURL(userfile)) && formData.append("profile", userfile);

        let updatePromise = updateUser(formData);
        toast.promise(updatePromise, {
          pending: "Updating Profile...",
          success: "Profile Updated Successfully",
          error: "Error in Updating Profile",
        });

        updatePromise
          .then(() => {
            setTimeout(() => {
              navigate("/",{replace:true});
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

  // const handleTogglePasswordVisibility = () => {
  //   setShowPassword((prevShowPassword) => !prevShowPassword);
  // };

  // const imageUrl = apiData?.others.profile
  //   ? (serverLink + "/" + apiData?.others.profile).replace(/\\/g, "/")
  //   : UserAvatar;

  const onUploadAvatar = async (event) => {
    const fileSelected = event.target.files[0];
    setUserFile(fileSelected); // Set files or null if no file is selected
  };

  const handleAvatarClick = () => {
    document.getElementById("avatarInput").click();
  };

  //logout handler
  function logoutHandler() {
    localStorage.removeItem("token");
    navigate("/signin");
  }

  if (isLoading) {
    return <h1 className="text-2xl font-bold">Loading...</h1>;
  }
  if (serverError) {
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  }
  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer
        autoClose={2000}
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
        {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <MdLockOutline />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
          encType="multipart/form-data"
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
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

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                {...formik.getFieldProps("firstName")}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                {...formik.getFieldProps("lastName")}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoComplete="given-name"
                name="username"
                fullWidth
                id="username"
                label="User Name"
                autoFocus
                {...formik.getFieldProps("username")}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="mobileNumber"
                label="Mobile No."
                name="mobileNumber"
                autoComplete="mobileNumber"
                {...formik.getFieldProps("mobileNumber")}
                error={
                  formik.touched.mobileNumber &&
                  Boolean(formik.errors.mobileNumber)
                }
                helperText={
                  formik.touched.mobileNumber && formik.errors.mobileNumber
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                {...formik.getFieldProps("password")}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </IconButton>
                  ),
                }}
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Profile
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <span className="text-gray-500">
                come back later?{" "}
                <button onClick={logoutHandler} className="text-red-500" to="/">
                  Logout
                </button>
              </span>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
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
