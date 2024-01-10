import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUsernameFromToken } from "../helpers/helper";
import {jwtDecode} from "jwt-decode";

export function AuthorizeUser({ children }) {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);

      // Check if the token is expired
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTimestamp) {
        console.error("Token has expired");
        localStorage.removeItem("token");
      }
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/signin" replace={true} />;
  }

  return children;
}

export const ProtectedRoute = ({ children }) => {
  const username = useSelector((state) => state.auth.emailOrUsername);
  if (!username) {
    return <Navigate to="/signin" replace={true} />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const {role} = getUsernameFromToken()
  if(role !== 'admin'){
    return <Navigate to="/" replace={true} />;
  }
  return children;
}
