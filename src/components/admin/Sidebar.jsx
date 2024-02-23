// Sidebar.jsx
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Hidden,
  Box,
  IconButton,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import { useSelector } from "react-redux";
import { HiMenuAlt1 } from "react-icons/hi";
import "../../assets/css/sidebar.css";

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: drawerWidth,
    flexShrink: 0,
  },
  width: drawerWidth,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  "& .MuiListItemText-root": {
    whiteSpace: "normal", // Allow text to wrap
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid #ccc`,
  height: "87.5vh",
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap", // Wrap content when screen size is smaller (sm and below)
    "& > *": {
      whiteSpace: "normal", // Allow text to wrap
    },
  },
  zIndex: 1,
}));

const Sidebar = ({ onItemClick }) => {
  const theme = useTheme(); // Use useTheme to access the current theme
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  const handleItemClick = (component) => {
    onItemClick(component);
  };
  return (
    <div>
      {/* <Hidden smDown implementation="css"> */}
      {/* <StyledDrawer variant="permanent"> */}
      <StyledBox display="flex" flexDirection="column" theme={theme}>
        <List>
          <StyledListItem button onClick={() => handleItemClick("dashboard")}>
            <ListItemText primary="Dashboard" />
          </StyledListItem>
          <StyledListItem button onClick={() => handleItemClick("user")}>
            <ListItemText primary="Users" />
          </StyledListItem>
          <StyledListItem button onClick={() => handleItemClick("deletedUser")}>
            <ListItemText primary="Deleted User" />
          </StyledListItem>
          <StyledListItem button onClick={() => handleItemClick("getAllCodesByUsername")}>
            <ListItemText primary="Get Codes" />
          </StyledListItem>
          <StyledListItem button onClick={() => handleItemClick("getAllDeletedCodesByUsername")}>
            <ListItemText primary="Get Deleted Codes" />
          </StyledListItem>
        </List>
      </StyledBox>
      {/* </StyledDrawer> */}
      {/* </Hidden> */}
      {/* Add mobile-friendly navigation or hamburger menu here */}
      {/* <Hidden smUp implementation="css">
        <IconButton color="inherit" onClick={handleMobileDrawerToggle}>
          <HiMenuAlt1 />
        </IconButton>
        <Drawer anchor="left" open={mobileDrawerOpen} onClose={handleMobileDrawerToggle}>
          <List>
            <StyledListItem button>
              <ListItemText primary="Dashboard" />
            </StyledListItem>
            <StyledListItem button>
              <ListItemText primary="Users" />
            </StyledListItem>
          </List>
        </Drawer>
      </Hidden> */}
    </div>
  );
};

export default Sidebar;
