import React from "react";
import { Container, Grid, Typography, Button, Box, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { FaGithub, FaTwitterSquare } from "react-icons/fa";

const Typewriter = ({ text }) => {
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.span variants={textVariants} initial="hidden" animate="visible">
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={charVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const IndexPage = () => {
  const developer = {
    name: "Pratham Parikh",
    avatar: "avatar.jpeg",
    caption: "Full Stack Developer",
    github: "https://github.com/pratham15541",
    twitter: "https://twitter.com/pratham15541",
  };

  const features = [
    "Real-time syntax highlighting",
    "Auto-indentation and code suggestions",
    "Support for multiple programming languages",
    "Live preview of code output",
  ];

  return (
    <div style={{ perspective: "1000px" }}>
      <Container
        maxWidth="xl"
        sx={{
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative", // Ensure z-index works as expected
          textAlign: "center", // Center text horizontally
          transformStyle: "preserve-3d", // Apply 3D transformations
        }}
      >
        <motion.div
          style={{ transform: "rotateY(30deg)" }} // Rotate the container in 3D space
          initial={{ opacity: 0, rotateY: -30 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" align="center" color="HighlightText" gutterBottom>
            <Typewriter text="Online Code Editor" />
          </Typography>

        </motion.div>
      </Container>
      <Container maxWidth="xl" id="features" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          Features
        </Typography>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          {features.map((feature, index) => (
            <Grid key={index} item xs={12}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Box
                  sx={{
                    p: 2,
                    textAlign: "center",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography variant="h6" color="textPrimary" gutterBottom>
                    {feature}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          Developed By
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 20px", // Adjust padding as needed
            "@media (min-width:600px)": {
              padding: "0 40px", // Adjust padding for larger screens
            },
          }}
        >
          <img
            src={developer.avatar}
            alt="Developed By"
            style={{
              marginBottom: 20,
              width: "10%",
              height: "10%",
              borderRadius: "50%",
            }}
          />
          <Typography variant="h5" color="textPrimary" gutterBottom>
            {developer.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {developer.caption}
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center" paragraph>
            <IconButton href={developer.github} target="_blank">
              <FaGithub />
            </IconButton>
            <IconButton href={developer.twitter} target="_blank">
              <FaTwitterSquare />
            </IconButton>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default IndexPage;
