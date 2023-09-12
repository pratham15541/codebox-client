import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";
import Plaground from "../pages/Plaground";
import Login from "../pages/Login";
import Index from "../pages/Index";
import Docs from "../pages/Docs";
import SignUp from "../pages/SignUp";
import Footer from "../components/Footer/Footer";
import Webcontainer from "../utils/Webcontainer";

const CustomeRoute = () => {
  return (
    <Router>
      <Webcontainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/playground"  element={<Plaground />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default CustomeRoute;
