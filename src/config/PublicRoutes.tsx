import React from "react";
import { Outlet } from "react-router-dom";

const PublicWrapper: React.FC = () => {
  return <Outlet />;
};

export default PublicWrapper;
