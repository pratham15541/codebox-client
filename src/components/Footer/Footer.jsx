import { Paper } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Paper
      sx={{
        width: "100%",
        bottom: 0,
        position: "fixed",
        zIndex:'100'
      }}
    >
      Footer 
    </Paper>
  );
};

export default Footer;
