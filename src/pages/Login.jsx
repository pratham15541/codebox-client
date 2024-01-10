import React from "react";
import SEO from "../seo/Seo";
import Username from "../components/Auth/Username";

const Login = () => {
  return (
    <>
      <SEO title="CodeBox - Login" description="CodeBox - Login" name="CodeBox - Login" type="Website" />
      <Username />
    </>
  );
};

export default Login;
