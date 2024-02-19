import React from "react";
import { tabsItem } from "./tabsItem";

interface Props {
  tab: string;
  handleTabs: (value: string) => void;
}
const SideTabsMobile: React.FC<Props> = ({ tab, handleTabs }) => {
  return (
    <div className="side_tabs_mobile_box">
      {tabsItem.map((v) => {
        return (
          <div
            key={v.name}
            className={`tabs_item ${tab === v.name ? "active" : ""}`}
            onClick={() => handleTabs(v.name)}
          >
            <div className="icon_box">
              <img src={v.icon} alt={"Icon"} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SideTabsMobile;
