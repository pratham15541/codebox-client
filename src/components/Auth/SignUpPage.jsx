
import React, { useState } from "react";
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
import { signup as signUpUser } from "../../helpers/helper";

const SignUp = () => {
  const themeMode = useSelector((state) => state.theme.mode);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      profile: null, // This will be used to store the selected file
    },
    validate: validateSignUpForm,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("profile", values.profile);

      let registerPromise = signUpUser(formData);
      toast.promise(registerPromise, {
        pending: "Registering...",
        success: "Registered successfully",
        error: "Error during registration",
      });

      registerPromise
        .then(() => {
          
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        })
        .catch((error) => {
          console.error("Error during registration:", error);
        });
    },
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onUploadAvatar = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("profile", file);
  };

  const handleAvatarClick = () => {
    document.getElementById("avatarInput").click();
  };

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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <MdLockOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
                  src={formik.values.profile ? URL.createObjectURL(formik.values.profile) : './avatar-default.png'}
                  loading="lazy"
                  alt="Avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Avatar>
              <input
                type="file"
                id="avatarInput"
                name="profile"
                onChange={onUploadAvatar}
                style={{ display: "none" }}
                accept="image/*"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
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
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                component={ReactRouterDomLink}
                variant="body2"
                to={"/signin"}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

const validateSignUpForm = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Username is required";
  } else if (values.username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!verifyEmail(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (!verifyPassword(values.password)) {
    errors.password = "Password must contain at least 8 characters";
  }

  return errors;
};

const verifyEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const verifyPassword = (password) => {
  return password.length >= 8;
};

export default SignUp;
