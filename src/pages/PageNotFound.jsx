import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import SEO from "../seo/Seo";

const AnimatedContainer = styled(Container)`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  animation: fadeIn 1s forwards;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const AnimatedTypography = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export default function PageNotFound() {
  
  return (
    <>
    <SEO title="CodeBox - 404" description="CodeBox - 404" name="CodeBox - 404" type="Website"/>
    <AnimatedContainer component="main">
    <Box>
      <AnimatedTypography variant="h1" gutterBottom>
        404
      </AnimatedTypography>
      <AnimatedTypography variant="h3" gutterBottom>
        Page Not Found
      </AnimatedTypography>
      <AnimatedTypography variant="h3" gutterBottom>
        <Button variant="contained" color="success" >
          <Link to="/"  >Go Back</Link>
        </Button>
      </AnimatedTypography>
    </Box>
  </AnimatedContainer>
  </>
  );
}
