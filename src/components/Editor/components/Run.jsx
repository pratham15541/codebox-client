import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { runnerUrl } from "../../../App";
import { setCodeOutput } from "../../../store/slices/codeOutputSlice";
import { langExtensions } from "../../../utils/langExtensions";
import { ToastContainer, toast } from "react-toastify";

const Run = ({ switchToOutputTab }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const code = useSelector((state) => state.code.codeStore);
  const language = useSelector((state) => state.languageSelector.langSelected);
  const input = useSelector((state) => state.codeInput.codeInput);

  const extension = langExtensions[language];

  const [executionInProgress, setExecutionInProgress] = useState(false);
  const handleClick = async () => {
    try {
      setExecutionInProgress(true);
      const Axdata = {
        stdin: input || "",
        files: [
          {
            name: `main.${extension}`,
            content: code,
          },
        ],
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${import.meta.env.VITE_RUNNER_API_TOKEN}`,
      };

      const url = `${runnerUrl}/api/run/${language}/latest`;

      const { data } = await axios.post(url, Axdata, { headers });
      // Call the switchToOutputTab function after successful execution
      switchToOutputTab();
      data.stderr !== "" && data.error !== ""
        ? toast.error("Code Executed with errors")
        : toast.success("Code Executed Successfully");
      dispatch(setCodeOutput(data));
      setExecutionInProgress(false);
    } catch (error) {
      console.log(error);
      setExecutionInProgress(false);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginLeft: "45%", marginTop: "4%" , marginBottom: "4%"}}
        onClick={handleClick}
        disabled={executionInProgress} // Disable the button during execution
      >
        {executionInProgress ? (
          <CircularProgress size={24} color="secondary" /> // Show loader if execution is in progress
        ) : (
          "Compile and Execute"
        )}
      </Button>
      <ToastContainer
        autoClose={2000}
        theme={themeMode === "dark" ? "light" : "dark"}
      />
    </>
  );
};

export default Run;
