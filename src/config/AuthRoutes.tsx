import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils";

const AuthWrapper: React.FC = () => {
  const isAuthenticated = getToken();

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default AuthWrapper;
