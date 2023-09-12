import React from "react";
import { Box } from "@mui/material";
import { ResizableBox } from "react-resizable";
import "../../../assets/css/react-resizable.css";
// import "../../../utils/Webcontainer";

const Terminals = () => {
  const boxStyle = {
    border: "1px solid #333", // Border color
    borderRadius: "4px", // Border radius for rounded corners
    padding: "8px 0px 0px 8px",
    background: "#1E1E1E", // Background color
    boxSizing: "border-box", // Makes sure that padding does not increase the size
    marginTop: "-7px",
  };

  return (
    <>
      <ResizableBox width={1470} height={163}>
        <Box
          id="terminalEl"
          // overflow={"auto"}
          width={"100%"}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          sx={boxStyle}
        >
          {/* Content of your terminal */}
        </Box>
      </ResizableBox>
    </>
  );
};

export default Terminals;
