import React from "react";
import { Box, styled, useTheme } from "@mui/system";
import { ResizableBox } from "react-resizable";
import "../../../assets/css/react-resizable.css";

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'none',
  position: 'absolute',
  marginBottom: '5px',
  borderRadius: '4px',
  boxShadow: theme.palette.mode === 'dark' ? '0 2px 10px rgba(0, 0, 0, 0.6)' : '0 2px 10px rgba(0, 0, 0, 0.1)',
  padding: '8px',
  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
}));

const StyledButton = styled('button')(({ theme }) => ({
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: '10px',
  transition: 'background-color 0.3s ease',
  border: 'none',
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  cursor: 'pointer',
  outline: 'none',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#444' : '#f0f0f0',
  },
}));

const Filetree = ({ display }) => {
  const theme = useTheme();

  return (
    <>
      <ResizableBox
        width={220}
        height={475}
        resizeHandles={["e"]}
        minConstraints={[200, 475]}
        maxConstraints={[400, 475]}
        style={{ display: display }}
      >
        <Box
          overflow={"auto"}
          width={"100%"}
          height={"98%"}
          display={"flex"}
          flexDirection={"column"}
          sx={{ border: "1px solid #777", padding: "0.5rem" }}
        >
          <Box
            overflow={"auto"}
            width={"100%"}
            height={"98%"}
            display={"flex"}
            flexDirection={"column"}
            id="filetree"
          ></Box>

          <StyledBox id="contextMenu" theme={theme}>
            <StyledButton id="createFolder">Create Folder</StyledButton>
            <StyledButton id="createFile">Create File</StyledButton>
            <StyledButton id="renameFile">Rename</StyledButton>
            <StyledButton id="deleteFile">Delete</StyledButton>
          </StyledBox>
        </Box>
      </ResizableBox>
    </>
  );
};

export default Filetree;
