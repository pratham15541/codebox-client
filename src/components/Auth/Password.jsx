import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import Link from "@mui/material/Link";
import { Link as ReactRouterDomLink, useNavigate } from "react-router-dom";
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
import useFetch from "../../hooks/fetch.hook";
import UserAvatar from "../../assets/images/avatar.png";
import { login } from "../../helpers/helper";

function validateEmailAndPassword(values) {
  const errors = {};

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must contain at least 8 characters";
  }

  return errors;
}

export default function SignIn() {
  const username = useSelector((state) => state.auth.emailOrUsername);
  const themeMode = useSelector((state) => state.theme.mode);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const serverLink = import.meta.env.VITE_SERVER_DOMAIN;
  

  const [{ isLoading, apiData, serverError, status }] = useFetch(
    `/user/${username}`
  );



  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: validateEmailAndPassword,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = login({
        emailOrUsername: username,
        password: values.password,
      });

      
      toast.promise(loginPromise, {
        pending: "Logging in...",
        success: "Logged in successfully",
        error: "Error during login",
      });

      loginPromise
        .then((res) => {
          let { token,role } = res.data;
          localStorage.setItem("token", token);
          
          setTimeout(() => {
            if(role === 'admin'){
              navigate("/admin");
            }else{
              navigate("/");
            }
          }, 1000);
        })
        .catch((error) => {
          console.error("Error during login:", error);
        });
    },
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const imageUrl =apiData?.others.profile ? (serverLink + '/' + apiData?.others.profile).replace(/\\/g, '/') : UserAvatar;

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
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <MdLockOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in {apiData?.others.firstName || apiData?.others.username}
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
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
                width: "70px",
                height: "70px",
              }}
            >
              <img
                src={imageUrl}
                crossOrigin="anonymous"
                loading="lazy"
                alt="Avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Avatar>
          </Grid>
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
             
                <Link variant="body2" to="/recovery" component={ReactRouterDomLink}> {"Forgot Password"}</Link>
             
            </Grid>
            <Grid item>
       
                <Link variant="body2" to={"/signup"} component={ReactRouterDomLink}> {"Don't have an account? Sign Up"}</Link>
              
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
