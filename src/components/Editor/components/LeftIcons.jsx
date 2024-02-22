import React, { useEffect, useState } from "react";
import { VscMenu, VscFiles, VscSettingsGear } from "react-icons/vsc";
import { SiPrettier } from "react-icons/si";
import { VscFolder, VscFile, VscSave } from "react-icons/vsc";
import { useSelector } from "react-redux";
import {
  Grid,
  Tooltip,
  Popover,
  MenuItem,
  Menu,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { styled } from "@mui/system";
import "../../../assets/css/LeftIcons.css"; // Custom CSS for styling the sidebar
import Settings from "./Settings";
import { getUsernameFromToken } from "../../../helpers/helper";

const MyStyledGrid = styled(Grid)({
  backgroundColor: "#333",
  color: "white",
  width: "60px" /* Adjust the width as needed */,
  paddingTop: "20px" /* Add some top padding for better alignment */,
});

const LeftIcons = ({ openFiletree, closeFiletree }) => {
  const themeMode = useSelector((state) => state.theme.mode);
  const selectedLanguage = useSelector(
    (state) => state.languageSelector.langSelected
  );
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleSaveFile = () => {
    // Implement the logic for saving the file
    // console.log("save file");
    handleClose();
  };

  const handleCreateNewFile = () => {
    // Implement the logic for creating a new file
    handleClose();
  };

  const handleCreateNewFolder = () => {
    // Implement the logic for creating a new folder
    handleClose();
  };
  const [isUser, setIsUser] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFiletreeVisible, setIsFiletreeVisible] = useState(false);

  const toggleFiletreeVisibility = () => {
    setIsFiletreeVisible((prev) => !prev);
    if (!isFiletreeVisible) {
      openFiletree();
    } else {
      closeFiletree();
    }
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  useEffect(()=>{
    const tokenInfo = getUsernameFromToken();
    const username = tokenInfo ? tokenInfo.username : null;
    setIsUser(username);
  })

  return (
    <MyStyledGrid
      container
      direction="column"
      className="sidebar"
      spacing={2}
      alignItems="center"
      sx={{ height: "87.5vh", marginTop: "1px" }}
    >
      {/* Top Icons */}
      {/* <Grid item>
        <Tooltip
          title="Menu"
          placement="right"
          arrow
          enterTouchDelay={700}
          enterDelay={700}
          enterNextDelay={700}
        >
          <div onClick={handleClick}>
            <VscMenu size={24} className="icon" />
          </div>
        </Tooltip>
      </Grid> */}

      {
        isUser ? 
        (<Grid item>
        <Tooltip
          title="Save Code"
          placement="right"
          arrow
          enterTouchDelay={700}
          enterDelay={700}
          enterNextDelay={700}
        >
          <div id="saveFile">
            <VscSave size={24} className="icon" />
          </div>
        </Tooltip>
      </Grid>)
        : null
      }

      {/* <Popover
        id="menu-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleSaveFile} id="saveFile" >
        <div >
          <ListItemIcon>
            <VscSave fontSize="small" />
          </ListItemIcon>
          Save File
          </div>
        </MenuItem>
        <MenuItem onClick={handleCreateNewFile} id="createNewFile">
          <ListItemIcon>
            <VscFile fontSize="small" />
          </ListItemIcon>
          Create New File
        </MenuItem>
        <MenuItem onClick={handleCreateNewFolder} id="createNewFolder">
          <ListItemIcon>
            <VscFolder fontSize="small" />
          </ListItemIcon>
          Create New Folder
        </MenuItem>
        <Divider />
         Include other menu items as needed 
      </Popover> */}

      <Grid item>
        <Tooltip
          title="Explorer"
          placement="right"
          arrow
          enterTouchDelay={700}
          enterDelay={700}
          enterNextDelay={700}
        >
          <div>
            <VscFiles
              size={24}
              className="icon"
              onClick={toggleFiletreeVisibility}
            />
          </div>
        </Tooltip>
      </Grid>

      {/* <Filetree open={isDrawerOpen} onClose={handleDrawerClose} /> */}
      {selectedLanguage == "javascript" || selectedLanguage == "typescript" ? (
        <Grid item>
          <Tooltip
            title="Format Code"
            placement="right"
            arrow
            enterTouchDelay={700}
            enterDelay={700}
            enterNextDelay={700}
          >
            <div>
              <SiPrettier size={24} className="icon" id="formatCode" />
            </div>
          </Tooltip>
        </Grid>
      ) : (
        ""
      )}

      {/* Settings Icon */}
      <Grid item sx={{ marginTop: "auto", marginBottom: "1rem" }}>
        <Tooltip
          title="Settings (Ctrl + Shift + S)"
          placement="right"
          arrow
          enterTouchDelay={700}
          enterDelay={700}
          enterNextDelay={700}
        >
          <div>
            <VscSettingsGear
              size={24}
              className="icon"
              onClick={handleDrawerOpen}
            />
          </div>
        </Tooltip>
      </Grid>
      {/* Settings Dialog */}
      <Settings open={isDrawerOpen} onClose={handleDrawerClose} />
    </MyStyledGrid>
  );
};

export default LeftIcons;
