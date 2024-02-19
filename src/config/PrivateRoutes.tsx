import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils";

const PrivateWrapper: React.FC = () => {
  const isAuthenticated = getToken();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateWrapper;
