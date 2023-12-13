import React, { useState } from "react";
import { VscMenu, VscFiles, VscSettingsGear } from "react-icons/vsc";
import { SiPrettier } from "react-icons/si";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import {styled} from '@mui/system'
import "../../../assets/css/LeftIcons.css"; // Custom CSS for styling the sidebar
import Settings from "./Settings";
import Filetree from "./Filetree";

const MyStyledGrid = styled(Grid)({
  backgroundColor: '#333',
  color: 'white',
  width: '60px', /* Adjust the width as needed */
  paddingTop: '20px', /* Add some top padding for better alignment */
})


const LeftIcons = ({ openFiletree, closeFiletree }) => {
  const themeMode = useSelector((state) => state.theme.mode);
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

  return (
    <MyStyledGrid
      container
      direction="column"
      className="sidebar"
      spacing={2}
      alignItems="center"
      sx={{ height: "87.5vh",marginTop:'1px'}}
    >
      {/* Top Icons */}
      <Grid item>
        <VscMenu size={24} className="icon" title="Menu" />
      </Grid>
        <Grid item>
          <VscFiles size={24} className="icon" title="Explorer" onClick={toggleFiletreeVisibility}   />
        </Grid>
        
        {/* <Filetree open={isDrawerOpen} onClose={handleDrawerClose} /> */}
      {/* <Grid item>
        <SiPrettier size={24} className="icon" title="Format Code"  />
      </Grid> */}

      {/* Settings Icon */}
      <Grid item sx={{ marginTop: "auto", marginBottom: "1rem" }}>
        <VscSettingsGear
          size={24}
          className="icon"
          title="Settings (Ctrl + Shift + S)"
          onClick={handleDrawerOpen}
        />
      </Grid>
      {/* Settings Dialog */}
      <Settings open={isDrawerOpen} onClose={handleDrawerClose} />
    </MyStyledGrid>
  );
};

export default LeftIcons;

// import React, { useState } from "react";
// import { VscMenu, VscFiles, VscSettingsGear } from "react-icons/vsc";
// import { SiPrettier } from "react-icons/si";
// import { useSelector } from "react-redux";
// import { Grid } from "@mui/material";
// import {styled} from '@mui/system'
// import "../../../assets/css/LeftIcons.css"; // Custom CSS for styling the sidebar
// import Settings from "./Settings";

// const MyStyledGrid = styled(Grid)({
//   backgroundColor: '#333',
//   color: 'white',
//   width: '60px', /* Adjust the width as needed */
//   paddingTop: '20px', /* Add some top padding for better alignment */
// })


// const LeftIcons = () => {
//   const themeMode = useSelector((state) => state.theme.mode);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const handleOpenDrawer = () => {
//     setIsDrawerOpen(true);
//   };

//   const handleCloseDrawer = () => {
//     setIsDrawerOpen(false);
//   };


//   return (
//     <MyStyledGrid
//       container
//       direction="column"
//       className="sidebar"
//       spacing={2}
//       alignItems="center"
//       sx={{ height: "87.5vh",marginTop:'1px'}}
//     >
//       {/* Top Icons */}
//       <Grid item>
//         <VscMenu size={24} className="icon" title="Menu" />
//       </Grid>
//       <Grid item>
//         <VscFiles size={24} className="icon" title="Explorer" />
//       </Grid>
//       {/* <Grid item>
//         <SiPrettier size={24} className="icon" title="Format Code"  />
//       </Grid> */}

//       {/* Settings Icon */}
//       <Grid item sx={{ marginTop: "auto", marginBottom: "1rem" }}>
//         <VscSettingsGear
//           size={24}
//           className="icon"
//           onClick={handleOpenDrawer}
//         />
//       </Grid>
//       {/* Settings Dialog */}
//       <Settings open={handleOpenDrawer} onClose={handleCloseDrawer} />
//     </MyStyledGrid>
//   );
// };

// export default LeftIcons;
