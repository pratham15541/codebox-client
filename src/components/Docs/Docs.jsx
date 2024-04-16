import React, { useRef } from 'react';
import '../../assets/css/Docs.css';
import { Box, Typography, List, ListItem,useTheme } from '@mui/material';
import { styled } from '@mui/system';

const Docs = () => {
  const imagesRef = useRef(null);
  const theme = useTheme()

  // Function to handle scrolling to the selected image
  const scrollToImage = (imageName) => {
    const imageElement = document.getElementById(`image-${imageName}`);
    if (imageElement) {
      imageElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const Sidebar = styled(Box)(({ theme }) => ({
  
    backgroundColor: theme.palette.mode === 'dark' ? "#272727" : theme.palette.background.paper,
    color: theme.palette.mode === 'dark' ? "#fff" : "#333",
    boxShadow: theme.shadows[5],
    marginRight: theme.spacing(1),
  }));
  
  // Styled Sidebar Content
  const SidebarContent = styled(Box)(({ theme }) => ({
    '& ul': {
      listStyleType: 'none',
      padding: 0,
    },
    '& li': {
      cursor: 'pointer',
      padding: '10px',
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
        // Adjust hover color according to theme
      },
    },
  }));
  
  // Styled Image Box
  const ImageBox = styled(Box)(({ theme }) => ({
   
  }));

  // Array of titles and image names
  const titlesAndImages = [
    { title: "Click on SIGN UP to signup as new user", image: "1.png" },
    { title: "Fill All details and Click on SIGN UP", image: "2.png" },
    { title: "Login with credentials And Click on CONTINUE", image: "3.png" },
    { title: "Fill password and Click on SIGN IN", image: "4.png" },
    { title: "Click on Profile to Update profile", image: "5.png" },
    { title: "Make changes and Click on UPDATE PROFILE", image: "6.png" },
    { title: "Click on Playground", image: "7.png" },
    { title: "Click on Explorer", image: "8.png" },
    { title: "Right click on filetree", image: "9.png" },
    { title: "Click on Settings (Ctrl + Shift + S)", image: "10.png" },
    { title: "Select here to change languages", image: "11.png" },
    { title: "Type Please enter an input", image: "12.png" },
    { title: "Click on COMPILE AND EXECUTE", image: "13.png" },
    { title: "Click on Code Executed Successfully", image: "14.png" },
    { title: "Click on Save Code", image: "15.png" },
    { title: "Click on Save Code", image: "16.png" },
    { title: "Click on Update Code", image: "17.png" },
    { title: "Click on Dashboard", image: "18.png" },
    { title: "Click on cpp code…", image: "19.png" },
    { title: "Click on UPDATE", image: "20.png" },
    { title: "Click on DELETE", image: "21.png" },
    { title: "Click here to change theme", image: "22.png" },
    { title: "Click on Logout for logging out", image: "23.png" }
  ];
  
  return (
    <>
        
        <Sidebar className='sidebar'>
        <SidebarContent className='sidebar-content'>
          <List>
            {titlesAndImages.map((item, index) => (
              <ListItem key={index} onClick={() => scrollToImage(item.image)}>
                {index+1 + "."  +item.title}
              </ListItem>
            ))}
          </List>
        </SidebarContent>
      </Sidebar>
      <Box className="content" ref={imagesRef}>
      <Box style={{display:'flex' , justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
          <Typography style={{fontWeight:'bolder'}}>Codebox</Typography>
          <p>An online code editor and compiler</p>
        </Box>
        <hr />
        <Box className="images-container">
          {titlesAndImages.map((item, index) => (
              <ImageBox className='' key={index} id={`image-${item.image}`} theme={theme}>
              <span className="img-span">{index + 1}. {item.title}</span>
              <img className="images" src={`./codebox-img/${item.image}`} alt={item.title} />
            </ImageBox>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Docs;
