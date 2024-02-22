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
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { generateOTP, verifyOTP } from "../../helpers/helper";

const validateOTP = (values) => {
  const errors = {};

  // Validate OTP
  if (!values.otp) {
    errors.otp = "OTP is required";
  } else if (!/^\d{6}$/.test(values.otp)) {
    errors.otp = "Invalid OTP. It must be a 6-digit number";
  }

  return errors;
};

export default function Recovery() {
  const themeMode = useSelector((state) => state.theme.mode);
  const username = useSelector((state) => state.auth.emailOrUsername);
  const navigate = useNavigate();

  const [OTP, setOTP] = React.useState();

  const useEffectCountRef = React.useRef(0);

  React.useEffect(() => {
    // Step 3: Increment the counter on each useEffect call
    useEffectCountRef.current += 1;
    const currentEffectCount = useEffectCountRef.current;

    // Step 4: Log the current count
    // console.log(`useEffect called - Count: ${currentEffectCount}`);

    // Step 5: Check if it's the first call (n1)
    if (currentEffectCount === 1) {
      // Step 6: Define the sendOTP function
      function sendOTP() {
        let sendPromise = generateOTP(username);
        toast.promise(sendPromise, {
          pending: "Sending OTP...",
          success: "OTP sent successfully",
          error: "Error while sending OTP",
        });
        sendPromise.then((OTP) => {
          // console.log(OTP);
        });
      }

      // Step 7: Call the sendOTP function on the first useEffect call
      sendOTP();
    } else {
      // Step 8: Log that sendOTP is not called on subsequent useEffect calls
      // console.log('sendOTP not called - Already executed on the first useEffect call');
    }
  }, [username]);
  
  

  //handle resend otp
  function resendOTP() {
    let sendPromise = generateOTP(username);
    toast.promise(sendPromise, {
      pending: "Sending OTP...",
      success: "OTP sent successfully",
      error: "Error while sending OTP",
    });
    sendPromise.then((OTP) => {
      // console.log(OTP);
    });
  }

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validate: validateOTP,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let { status } = await verifyOTP({
          emailOrUsername: username,
          code: OTP,
        });
        if (status === 201) {
          toast.success("OTP verified successfully");
          navigate("/reset");
        } else {
          toast.error("Error while verifying OTP");
        }
      } catch (error) {
        console.error("Error during OTP verification:", error);
        toast.error("Error while verifying OTP");
      } finally {
        setSubmitting(false); // Manually set submitting to false
      }
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
          Recovery Password
        </Typography>
        <Typography component="h1" variant="overline">
          Enter 6-digit OTP sent to your email
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
            id="otp"
            label="OTP"
            name="otp"
            autoComplete="otp"
            autoFocus
            {...formik.getFieldProps("otp")}
            error={!!formik.errors.otp}
            helperText={formik.errors.otp}
            onInput={(e) => setOTP(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Recover
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <span>
                {"Cant get OTP? "}
                <Link
                  variant="button"
                  onClick={resendOTP}
                  sx={{ cursor: "pointer" }}
                >
                  {"Resend"}
                </Link>
              </span>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
