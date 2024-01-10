import React from "react";
import {
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
  Button,
  Typography,
  Grid,
  Drawer,
  Divider,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import {CursorStyle, FontSize, KeyBinding} from './CodeEditorSettings'
import { styled } from "@mui/system";

const StyledBox = styled(Box)({
  marginBottom: "1rem",
});

const StyledTypography = styled(Typography)({
   fontSize: "1.5rem", marginTop: "1.5rem" 
})

const Settings = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <Box sx={{ width: "29rem", overflow: "auto" }}>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between">
            <span>Settings</span>
            <span>
              <MdClose onClick={onClose} cursor="pointer" />
            </span>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2} justifyContent="space-around">
            <Grid item xs={6}>
              <StyledBox marginTop="1rem">
                <Typography fontSize="1.5rem">Theme:</Typography>
              </StyledBox>
              <StyledBox marginTop="1rem">
                <StyledTypography>Language:</StyledTypography>
              </StyledBox>
             
              <StyledBox marginTop="3rem">
                <StyledTypography>Font Size:</StyledTypography>
              </StyledBox>
              <StyledBox marginTop="1rem">
                <StyledTypography>Cursor Style:</StyledTypography>
              </StyledBox>
              <StyledBox marginTop="1rem">
                <StyledTypography>Key Binding:</StyledTypography>
              </StyledBox>
            </Grid>
            <Grid item xs={6}>
              <StyledBox>
                <ThemeSelector />
              </StyledBox>
              <StyledBox>
                <LanguageSelector />
              </StyledBox>
              
              <StyledBox marginTop="2rem">
                <FontSize />
              </StyledBox>
              <StyledBox > 
                <CursorStyle />
              </StyledBox>
              <StyledBox>
                <KeyBinding />
              </StyledBox>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Box>
    </Drawer>
  );
};

export default Settings;
