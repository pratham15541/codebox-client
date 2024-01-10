import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import Link from "@mui/material/Link";
import { Link as ReactRouterDomLink,useNavigate,Navigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { MdLockOutline } from "react-icons/md";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { resetPassword } from "../../helpers/helper";
import useFetch from "../../hooks/fetch.hook";


const validatePasswords = (values) => {
  const errors = {};

  // Validate New Password
  if (!values.newPassword) {
    errors.newPassword = 'New Password is required';
  } else if (values.newPassword.length < 8) {
    errors.newPassword = 'New Password must be at least 8 characters long';
  }

  // Validate Confirm Password
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  } else if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export default function Reset() {
  const themeMode = useSelector((state) => state.theme.mode);
  const [showPassword, setShowPassword] = React.useState(false);
  const emailOrUsername = useSelector((state) => state.auth.emailOrUsername);
  const navigate = useNavigate(); 
 const [{isLoading,apiData,serverError,status}] =  useFetch(`/createResetSession`)

  

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validate: validatePasswords,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({emailOrUsername,password:values.newPassword})
      toast.promise(resetPromise, {
        pending: "Resetting...",
        success: "Reset Password successfully",
        error: "Error during reset",
      })
      resetPromise.then(()=>{
        navigate("/password");
      })
    },
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  if (isLoading) {
    return <h1 className="text-2xl font-bold">Loading...</h1>;
  }
  if (serverError) {
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  }

  if(status && status !== 201){
    return <Navigate to="/password" replace={true}></Navigate>
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
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <MdLockOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="text"
            id="newPassword"
            {...formik.getFieldProps("newPassword")}
            error={!!formik.errors.newPassword}
            helperText={formik.errors.newPassword}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            {...formik.getFieldProps("confirmPassword")}
            error={!!formik.errors.confirmPassword}
            helperText={formik.errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </IconButton>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          
        </Box>
      </Box>
    </Container>
  );
}
