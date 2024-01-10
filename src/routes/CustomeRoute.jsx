import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";
import Plaground from "../pages/Plaground";
import Login from "../pages/Login";
import Index from "../pages/Index";
import Docs from "../pages/Docs";
import SignUp from "../pages/SignUp";
import Webcontainer from "../utils/Webcontainer";
import PageNotFound from "../pages/PageNotFound";
import Profile from "../pages/Profile";
import Password from "../pages/Password";
import Recovery from "../pages/Recovery";
import Reset from "../pages/Reset";
import { AdminRoute, AuthorizeUser,ProtectedRoute } from "../middleware/auth";
import Admin from "../pages/Admin";
import Footer from "../components/Footer/Footer";

const CustomeRoute = () => {
  return (
  
    <Router>
      <Webcontainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<AdminRoute><AuthorizeUser><Admin /></AuthorizeUser></AdminRoute>} />
        <Route path="/playground" element={<Plaground />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/password" element={<ProtectedRoute><Password /></ProtectedRoute>} />
        <Route path="/profile" element={<AuthorizeUser><Profile /></AuthorizeUser>} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
    
  );
};

export default CustomeRoute;
