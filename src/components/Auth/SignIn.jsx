import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import Link from "@mui/material/Link";
import { Link as ReactRouterDomLink } from "react-router-dom";
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

function validateEmailAndPassword(values) {
  const errors = {};

  if (!values.emailOrUsername) {
    errors.emailOrUsername = "Email is required";
  } 

  if (!values.password) {
    errors.password = "Password is required";
  } else if (!verifyPassword(values.password)) {
    errors.password = "Password must contain at least 8 characters";
  }

  return errors;
}


function verifyPassword(password) {
  return password.length >= 8;
}

export default function SignIn() {
  const themeMode = useSelector((state) => state.theme.mode);
  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      emailOrUsername: "",
      password: "",
    },
    validate: validateEmailAndPassword,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      toast.success("Login Successful");
    },
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <MdLockOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
            id="emailOrUsername"
            label="Email or Username"
            name="emailOrUsername"
            autoFocus
            {...formik.getFieldProps("emailOrUsername")}
            error={!!formik.errors.emailOrUsername}
            helperText={formik.errors.emailOrUsername}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            {...formik.getFieldProps("password")}
            error={!!formik.errors.password}
            helperText={formik.errors.password}
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
          <Grid container>
            <Grid item xs>
              <ReactRouterDomLink to="/recovery">
                <Link variant="body2"> {"Forgot Password"}</Link>
              </ReactRouterDomLink>
            </Grid>
            <Grid item>
              <ReactRouterDomLink to={"/signup"}>
                <Link variant="body2"> {"Don't have an account? Sign Up"}</Link>
              </ReactRouterDomLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
