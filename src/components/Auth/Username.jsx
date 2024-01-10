import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
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
import { setUsername } from "../../store/slices/userAuthSlice";
import { authenticate } from "../../helpers/helper";

async function validateEmailAndPassword(values) {
  const errors = {};

  if (values.emailOrUsername === "") {
    errors.emailOrUsername = "Email or Username is required";
  } else {
    try {
      const response = await authenticate(values.emailOrUsername);

      if (response.status !== 200) {
        toast.error("Email or Username is incorrect");
        errors.emailOrUsername = "Email or Username is incorrect";
      } else {
        toast.success("User found!");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      errors.emailOrUsername = "Error during authentication";
    }
  }

  return errors;
}

export default function Username() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const [showPassword, setShowPassword] = React.useState(false);
  const username = useSelector((state) => state.auth.emailOrUsername);

  const formik = useFormik({
    initialValues: {
      emailOrUsername: "",
    },
    validate: validateEmailAndPassword,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      dispatch(setUsername(values.emailOrUsername));

      // setTimeout(() => {
        navigate("/password");
      // }, 1000);
    },
  });

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

          {/* <ReactRouterDomLink to={"/password"}> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Continue
          </Button>
          {/* </ReactRouterDomLink> */}
          <Grid container>
            <Grid item xs>
            {/* <Link
            component={ReactRouterDomLink}
            to="/recovery"
            variant="body2"
            sx={{ marginRight: 2 }}
          >
            Forgot Password
          </Link> */}
            </Grid>
            <Grid item>
            <Link
            component={ReactRouterDomLink}
            to="/signup"
            variant="body2"
          >
            Don't have an account? Sign Up
          </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
