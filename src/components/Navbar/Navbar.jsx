import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "../../store/slices/themeSlice";
import axios from "axios";
import {
  AppBar,
  IconButton,
  Typography,
  Grid,
  Button,
  Toolbar,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Hidden,
  Divider,
  MenuItem,
  Menu,
} from "@mui/material";
import { RiReactjsLine, RiMenu2Fill, RiCloseFill } from "react-icons/ri";
import { FiSun, FiMoon } from "react-icons/fi";
import { IconContext } from "react-icons";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import "../../assets/css/Navbar.css";
import useFetch from "../../hooks/fetch.hook";
import UserAvatar from "../../assets/images/avatar.png";
import { getUsernameFromToken } from "../../helpers/helper";
import { useLocation, useNavigate } from "react-router-dom";

const LoginButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    background: "transparent",
    boxShadow: "0 0 5px 5px rgba(94, 206, 132, 0.5)",
  },
  borderRadius: 50,
  borderColor: "#fff",
  color:
    theme.palette.mode === "dark"
      ? theme.palette.grey[300]
      : theme.palette.grey[900],
}));

const SignupButton = styled(Button)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light" ? theme.palette.grey[900] : "white",
  color: theme.palette.mode === "light" ? theme.palette.grey[300] : "#000",
  borderRadius: 50,
  "&:hover": {
    boxShadow: "0 0 5px 5px rgba(94, 206, 132, 0.5)",
  },
}));

const drawerStyle = {
  width: "250px",
  backgroundColor: "#202020",
  color: "#fff",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "1rem",
  paddingTop: "2rem",
  paddingBottom: "2rem",
  overflow: "hidden",
  "& .MuiListItem-root": {
    marginTop: "1rem",
    marginBottom: "1rem",
    borderRadius: "50px",
  },
  "& .MuiListItem-root:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
};

const Navbar = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = useTheme();
  const serverLink = import.meta.env.VITE_SERVER_DOMAIN;
  const navigate = useNavigate();
  const location = useLocation();
  const [isUser, setIsUser] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [role, setRole] = useState(null);

  // Use useEffect to force a re-render when the authentication state changes
  useEffect(() => {
    async function fetchData() {
      const tokenInfo = getUsernameFromToken();
      const username = tokenInfo ? tokenInfo.username : null;
      setRole(tokenInfo ? tokenInfo.role : null);
      setIsUser(username);
      if (username) {
        const { data } = await axios.get(`${serverLink}/api/user/${username}`);

        setImageUrl(
          data?.others.profile
            ? (serverLink + "/" + data?.others.profile).replace(/\\/g, "/")
            : UserAvatar
        );
      }
      // console.log(userdata);
    }
    fetchData();
  }, [location]);

  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const handleThemeToggle = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    dispatch(setThemeMode(newTheme));
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function logoutHandler() {
    localStorage.removeItem("token");
    handleClose();
    console.log("logout success");
    navigate("/signin");
  }

  return (
    <AppBar
      id="navbar"
      position="sticky"
      color="inherit"
      sx={{ borderBottom: 1, borderColor: "divider", width: "100vw" }}
    >
      <Toolbar>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <IconContext.Provider value={{ size: "1.5em" }}>
                <IconButton edge="start" color="inherit" aria-label="menu">
                  <RiReactjsLine />
                </IconButton>
              </IconContext.Provider>
            </Link>
          </Grid>
          <Hidden smDown>
            <Grid item marginLeft={1} />
          </Hidden>
          <Hidden smUp>
            <Grid item xs />
          </Hidden>
          <Hidden smDown>
            {role === "admin" ? (
              <Grid item>
                <Link
                  className="width-increasing-animation"
                  to="/admin"
                  style={{
                    marginTop: "0.2rem",
                    textDecoration: "none",
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.common.white
                        : theme.palette.grey[900],
                  }}
                >
                  <Typography variant="h6" component="div">
                    Dashboard
                  </Typography>
                </Link>
              </Grid>
            ) : null}

            <Grid item>
              <Link
                className="width-increasing-animation"
                to="/docs"
                style={{
                  marginTop: "0.2rem",
                  textDecoration: "none",
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.common.white
                      : theme.palette.grey[900],
                }}
              >
                <Typography variant="h6" component="div">
                  Docs
                </Typography>
              </Link>
            </Grid>

            <Grid item>
              <Link
                className="width-increasing-animation"
                // target="_top"
                to="/playground"
                style={{
                  marginTop: "0.2rem",
                  textDecoration: "none",
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.common.white
                      : theme.palette.grey[900],
                }}
              >
                <Typography variant="h6" component="div">
                  Playground
                </Typography>
              </Link>
            </Grid>
            <Grid item xs />
            {!isUser ? (
              <>
                <Grid item>
                  <Link to="/signin" style={{ textDecoration: "none" }}>
                    <LoginButton variant="outlined">Login</LoginButton>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <SignupButton variant="contained">Sign Up</SignupButton>
                  </Link>
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  {/* <Link to="/profile" style={{ textDecoration: "none" }}> */}
                  <img
                    src={imageUrl}
                    crossOrigin="anonymous"
                    alt="user avatar"
                    onClick={handleMenu}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                  {/* </Link> */}
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <Link to={"/profile"}>
                      {" "}
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                    </Link>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </Menu>
                </Grid>
              </>
            )}
          </Hidden>
          <Grid item>
            <IconButton color="inherit" onClick={handleThemeToggle}>
              {themeMode === "light" ? <FiSun /> : <FiMoon />}
            </IconButton>
          </Grid>
          <Hidden smUp>
            <Grid item>
              <IconContext.Provider value={{ size: "1.5em" }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleToggleDrawer}
                >
                  {open ? <RiCloseFill /> : <RiMenu2Fill />}
                </IconButton>
              </IconContext.Provider>
            </Grid>
          </Hidden>
        </Grid>
      </Toolbar>

      <Drawer
        anchor="right"
        PaperProps={{ sx: drawerStyle }}
        open={open}
        onClose={handleToggleDrawer}
      >
        <List>
          <Box
            display="flex"
            justifyContent="flex-end"
            padding={1}
            paddingRight={2}
          >
            <IconButton
              color="inherit"
              aria-label="close"
              onClick={handleToggleDrawer}
            >
              <RiCloseFill />
            </IconButton>
          </Box>
          {role === "admin" ? (
            <>
              <ListItem
                button
                component={Link}
                to="/admin"
                onClick={handleToggleDrawer}
              >
                <ListItemText>
                  <Typography
                    variant="h6"
                    component="div"
                    className="width-increasing-animation"
                  >
                    Dashboard
                  </Typography>
                </ListItemText>
              </ListItem>
            </>
          ) : null}
          <ListItem
            button
            component={Link}
            to="/docs"
            onClick={handleToggleDrawer}
          >
            <ListItemText>
              <Typography
                variant="h6"
                component="div"
                className="width-increasing-animation"
              >
                Docs
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/playground"
            onClick={handleToggleDrawer}
          >
            <ListItemText>
              <Typography
                variant="h6"
                component="div"
                className="width-increasing-animation"
              >
                Playground
              </Typography>
            </ListItemText>
          </ListItem>
          <Divider
            style={{
              backgroundColor: "#fff",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          />
          {!isUser ? (
            <>
              <ListItem
                button
                component={Link}
                to="/signin"
                onClick={handleToggleDrawer}
              >
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/signup"
                onClick={handleToggleDrawer}
              >
                <ListItemText primary="Sign Up" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                component={Link}
                to="/profile"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={imageUrl}
                  crossOrigin="anonymous"
                  alt="user avatar"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
