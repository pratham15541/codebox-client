import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
  Button,
  Typography,
  Grid,
  Drawer,
  Divider
} from "@mui/material";
import { MdClose } from "react-icons/md";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import { styled } from "@mui/system";

const StyledBox = styled(Box)({
  marginBottom: "1rem",
});

const Settings = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose} anchor="right" >
      <Box sx={{width:'29rem',overflow:'auto'}}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          <span>Settings</span>
          <span>
            <MdClose onClick={onClose} cursor="pointer" />
          </span>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent >
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid item xs={6}>
            <StyledBox>
              <Typography sx={{ fontSize: "1.5rem" }}>Theme:</Typography>
            </StyledBox>
            <StyledBox>
              <Typography sx={{ fontSize: "1.5rem", marginTop: "1.5rem" }}>
                Language:
              </Typography>
            </StyledBox>
          </Grid>
          <Grid item xs={6}>
            <StyledBox>
              <ThemeSelector />
            </StyledBox>
            <StyledBox>
              <LanguageSelector />
            </StyledBox>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions >
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
      </Box>
    </Drawer>
  );
};

export default Settings;
