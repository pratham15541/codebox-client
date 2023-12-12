// import React, { useEffect, useState } from "react";
// import {
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Stack,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { setSelectedLanguage } from "../../../store/slices/languageSelectorSlice";
// import { styled } from "@mui/system";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";

// import "react-toastify/dist/ReactToastify.min.css";

// import { runnerUrl } from "../../../App";

// const FormControlWrapper = styled(FormControl)({
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "space-between",
//   alignItems: "center",
// });

// const LanguageSelector = () => {
//   const themeMode = useSelector((state) => state.theme.mode);
//   const [langOptions, setLangOptions] = useState([]);
//   const selectedLanguagePrevious = useSelector(
//     (state) => state.languageSelector.langSelected,
//   );
//   const dispatch = useDispatch();

//   const [selectedLang, setSelectedLang] = useState(
//     selectedLanguagePrevious || "javascript",
//   );
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchLangs = async () => {
//     try {
//       const response = await axios.get(`${runnerUrl}/api/run`);
//       const extractedNames = response.data.map((lang) => lang.name);
//       setLangOptions(extractedNames);
//       localStorage.setItem("langOptions", JSON.stringify(extractedNames));
//       setIsLoading(false);
//     } catch (error) {
//       console.log("Error fetching language options:", error);
//       setIsLoading(false);
//     }
//   };

//   const handleLangChange = (event) => {
//     const newSelectedLang = event.target.value;
//     setSelectedLang(newSelectedLang);
//     dispatch(setSelectedLanguage(newSelectedLang));
//     toast.success(`Language changed successfully to ${newSelectedLang}!`); // Display toast message
//   };

//   useEffect(() => {
//     // console.log("Component mounted");
//     const cachedLangOptions = localStorage.getItem("langOptions");
//     if (cachedLangOptions) {
//       // console.log("Using cached language options");
//       setLangOptions(JSON.parse(cachedLangOptions));
//       setIsLoading(false); // Make sure to set isLoading to false when using cached data
//     } else {
//       // console.log("Fetching language options");
//       fetchLangs();
//     }
//   }, []);

//   return (
//     <>
//       {isLoading ? (
//         <>
//           <Stack>
//             <CircularProgress color="secondary" />
//           </Stack>
//         </>
//       ) : (
//         <>
//           <FormControlWrapper sx={{ width: "100%" }}>
//             {/*fullwidth */}
//             <InputLabel id="lang-selection">Language</InputLabel>
//             <Select
//               labelId="lang-selection"
//               label="Language"
//               value={selectedLang}
//               onChange={handleLangChange}
//               MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
//               sx={{ minWidth: 200, maxWidth: 200 }}
//             >
//               {langOptions.map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControlWrapper>
//           <ToastContainer
//             autoClose={2000}
//             theme={themeMode === "dark" ? "light" : "dark"}
//           />
//         </>
//       )}
//     </>
//   );
// };

// export default LanguageSelector;


import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLanguage } from "../../../store/slices/languageSelectorSlice";
import { styled } from "@mui/system";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

import { runnerUrl } from "../../../App";

const FormControlWrapper = styled(FormControl)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const LanguageSelector = () => {
  const themeMode = useSelector((state) => state.theme.mode);
  const [langOptions, setLangOptions] = useState([]);
  const selectedLanguagePrevious = useSelector(
    (state) => state.languageSelector.langSelected,
  );
  const dispatch = useDispatch();

  const [selectedLang, setSelectedLang] = useState(
    selectedLanguagePrevious || "javascript",
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchLangs = async () => {
    try {
      const response = await axios.get(`${runnerUrl}/api/run`);
      const extractedNames = response.data.map((lang) => lang.name);
      setLangOptions(extractedNames);
      localStorage.setItem("langOptions", JSON.stringify(extractedNames));
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching language options:", error);
      setIsLoading(false);
    }
  };

  const handleLangChange = (event) => {
    const newSelectedLang = event.target.value;
    setSelectedLang(newSelectedLang);
    dispatch(setSelectedLanguage(newSelectedLang));
    toast.success(`Language changed successfully to ${newSelectedLang}!`); // Display toast message
    // window.location.reload(); // Reload the page when language is changed
  };

  useEffect(() => {
    // console.log("Component mounted");
    const cachedLangOptions = localStorage.getItem("langOptions");
    if (cachedLangOptions) {
      // console.log("Using cached language options");
      setLangOptions(JSON.parse(cachedLangOptions));
      setIsLoading(false); // Make sure to set isLoading to false when using cached data
    } else {
      // console.log("Fetching language options");
      fetchLangs();
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Stack>
            <CircularProgress color="secondary" />
          </Stack>
        </>
      ) : (
        <>
          <FormControlWrapper sx={{ width: "100%" }}>
            {/*fullwidth */}
            <InputLabel id="lang-selection">Language</InputLabel>
            <Select
              labelId="lang-selection"
              label="Language"
              value={selectedLang}
              onChange={handleLangChange}
              MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
              sx={{ minWidth: 200, maxWidth: 200 }}
            >
              {langOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControlWrapper>
          <ToastContainer
            autoClose={2000}
            theme={themeMode === "dark" ? "light" : "dark"}
          />
        </>
      )}
    </>
  );
};

export default LanguageSelector;
