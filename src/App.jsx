import React, { useEffect } from "react";
import CustomeRoute from "./routes/CustomeRoute";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { HelmetProvider } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { setThemeMode } from "./store/slices/themeSlice";
import './utils/Webcontainer'


const proxyUrl = import.meta.env.VITE_PROXY_URL;
export const runnerUrl = proxyUrl + import.meta.env.VITE_API_RUNNER_URL;

function App() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);

 

  useEffect(() => {
    const storedThemeMode = localStorage.getItem("themeMode");
    if (storedThemeMode) {
      dispatch(setThemeMode(storedThemeMode));
    }
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const helmetContext = {};

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelmetProvider context={helmetContext}>
          <CustomeRoute />

        </HelmetProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
