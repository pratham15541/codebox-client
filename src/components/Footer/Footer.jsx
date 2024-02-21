import React from "react";
import { Container, Grid, Paper, Typography, Link } from "@mui/material";
import { FaTwitter, FaFacebook, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer">
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          bottom: 0,
          position: "fixed",
          zIndex: "100",
        }}
      >
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6} >
              <Typography variant="h6">CodeBox</Typography>
            
              {/* <Typography
                variant="body2"
                display={"flex"}
                alignItems={"center"}
                gap={1}
              >
                Follow us:
                <Link
                  href="https://twitter.com/your_twitter_handle"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />
                </Link>
                |
                <Link
                  href="https://www.facebook.com/your_facebook_page"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook />
                </Link>
              </Typography> */}
            </Grid>
            <Grid item xs={12} md={6} container justifyContent="flex-end">
              <Typography variant="body2" display={"flex"}>
                Contact us:
                <Link
                  href="mailto:demo31528@gmail.com"
                  display={"flex"}
                  marginLeft={"5px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <FaEnvelope />
                  
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </footer>
  );
};

export default Footer;
