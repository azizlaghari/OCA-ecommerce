import React, { useState } from "react";
import { Button } from "antd";

const Transaction: React.FC = () => {
  const [active, setActive] = useState<string>("All");

  return (
    <div className="transaction_container">
      <h2 className="setting_heading">Transaction</h2>
      <div className="button_box">
        {["All", "Completed", "Pending", "Refected"].map((v) => {
          return (
            <Button
              key={v}
              type="primary"
              className={`${active === v ? "primaryButton" : "outlinedButton"}`}
              onClick={() => setActive(v)}
            >
              {active === v ? v : <span className="gradientText">{v}</span>}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Transaction;
