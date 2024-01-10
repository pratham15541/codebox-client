// import React, { useState } from "react";
// import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
// import * as themes from "@uiw/codemirror-themes-all";
// import { useDispatch, useSelector } from "react-redux";
// import { setSelectedThemes } from "../../../store/slices/themeSelectorSlice";
// import { styled } from "@mui/system";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.min.css";

// const FormControlWrapper = styled(FormControl)({
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "space-between",
//   alignItems: "center",
// });

// const ThemeSelector = () => {
//   const themeMode = useSelector((state) => state.theme.mode);
//   const themeNames = Object.getOwnPropertyNames(themes);

//   // Filter out options that include "Init" in their labels
//   const themeOptions = themeNames
//     .filter(
//       (themeName) =>
//         !themeName.includes("Init") && !themeName.includes("default"),
//     )
//     .map((themeName) => ({ value: themeName, label: themeName }));

//   const selectedThemePrevious = useSelector(
//     (state) => state.themeSelector.selectedTheme,
//   );
//   const dispatch = useDispatch();

//   const [selectedTheme, setSelectedTheme] = useState(
//     selectedThemePrevious || "atomone",
//   );

//   const handleThemeChange = (event) => {
//     const newSelectedTheme = event.target.value;
//     setSelectedTheme(newSelectedTheme);
//     dispatch(setSelectedThemes(newSelectedTheme));
//     toast.success(`Theme changed successfully to ${newSelectedTheme}!`); // Display toast message
//   };

//   return (
//     <>
//       <FormControlWrapper sx={{ width: "100%" }}>
//         <InputLabel id="theme-selection">Theme</InputLabel>
//         <Select
//           labelId="theme-selection"
//           label="Theme"
//           value={selectedTheme}
//           onChange={handleThemeChange}
//           MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
//           sx={{ minWidth: 200, maxWidth: 200 }}
//         >
//           {themeOptions.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//           {themeMode === "light" ? (
//             <MenuItem value={"light"}>light</MenuItem>
//           ) : (
//             <MenuItem value={"dark"}>dark</MenuItem>
//           )}
//         </Select>
//       </FormControlWrapper>
//       <ToastContainer
//         autoClose={2000}
//         theme={themeMode === "dark" ? "light" : "dark"}
//       />{" "}
//       {/* Add the ToastContainer component */}
//     </>
//   );
// };

// export default ThemeSelector;

//ACE

import React, { useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  ListSubheader,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedThemes } from "../../../store/slices/themeSelectorSlice";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import * as themes from "../../../constants/themes";
import { Themes } from "../../../constants/themes";
const FormControlWrapper = styled(FormControl)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const ThemeSelector = () => {
  const themeMode = useSelector((state) => state.theme.mode);

  // const [selectedTheme, setSelectedTheme] = useState(Object.keys(themes)[0]);
  const selectedThemePrevious = useSelector(
    (state) => state.themeSelector.selectedTheme
  );
  const dispatch = useDispatch();

  const [selectedTheme, setSelectedTheme] = useState(
    selectedThemePrevious || "monokai"
  );

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    dispatch(setSelectedThemes(theme));
    toast.success(`Theme changed successfully to ${theme}!`); // Display toast message
  };

  return (
    <>
      <div>
        <FormControlWrapper sx={{ width: "100%" }}>
          <InputLabel id="theme-selection">Theme</InputLabel>
          <Select
            labelId="theme-selection"
            label="Theme"
            value={selectedTheme}
            onChange={(event) => handleThemeChange(event.target.value)}
            MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
            sx={{ minWidth: 200, maxWidth: 200 }}
            id="themeSelector"
          >
            <ListSubheader>Bright</ListSubheader>
            {Object.keys(themes.Themes.Bright).map((theme) => (
              <MenuItem key={theme} value={theme}>
                {theme}
              </MenuItem>
            ))}
            <ListSubheader>Dark</ListSubheader>
            {Object.keys(themes.Themes.Dark).map((theme) => (
              <MenuItem key={theme} value={theme}>
                {theme}
              </MenuItem>
            ))}
 
          </Select>
        </FormControlWrapper>
        <ToastContainer
          autoClose={2000}
          theme={themeMode === "dark" ? "light" : "dark"}
        />
      </div>
    </>
  );
};

export default ThemeSelector;
