import { Paper } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <footer id="footer">
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
    </footer>
  );
};

export default Footer;
