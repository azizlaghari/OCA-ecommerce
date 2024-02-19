import React from "react";
import { Spin } from "antd";

interface Props {
  spin?: boolean;
  text?: string;
}

const Loader: React.FC<Props> = ({ spin, text }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {spin && <Spin />}
      {text && <p>{text}</p>}
    </div>
  );
};

export default Loader;
