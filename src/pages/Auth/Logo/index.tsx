import React from "react";
import { useNavigate } from "react-router-dom";

const Logo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <img
      src={require("../../../assets/images/logo.png")}
      alt="logo"
      onClick={() => navigate("/")}
    />
  );
};

export default Logo;
