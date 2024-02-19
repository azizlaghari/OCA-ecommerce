import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import Header from "../../../components/Header";
import SideTabs from "./SideTabs";

import PersonalInformation from "./PersonalInformation";
import Footer from "../../../components/Footer";
import LoginAndSecurity from "./LoginandSecurity";
import OrderHistory from "./OrderHistory";
import ShareRewards from "./ShareRewards";
import SideTabsMobile from "./SideTabsMobile";
import { logout } from "../../../store/services/auth";
import ShareHistory from "./ShareHistory";

const Settings: React.FC = () => {
  const [tab, setTab] = useState("");
  const handleTabs = (value: string) => {
    if (value === "Logout") {
      setTab(value);
      logout();
    } else {
      setTab(value);
    }
  };

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const param = location.search.split("=")[1];
    param === "personalInformation"
      ? setTab("Personal Information")
      : param === "loginAndSecurity"
      ? setTab("Login and Security")
      : param === "orderHistory"
      ? setTab("Order History")
      : param === "shareRewards"
      ? setTab("Share Rewards")
      : param === "shareHistory"
      ? setTab("Share History")
      : setTab("Personal Information");
  }, [location]);

  return (
    <div className="setting_container_main">
      <Header />
      <div className="setting_container layoutPaddingInline">
        <div className="setting_left">
          <SideTabs tab={tab} handleTabs={handleTabs} />
          <SideTabsMobile tab={tab} handleTabs={handleTabs} />
        </div>
        <div className="setting_right">
          {tab === "Personal Information" && <PersonalInformation />}
          {tab === "Login and Security" && <LoginAndSecurity />}
          {tab === "Order History" && <OrderHistory />}
          {tab === "Share Rewards" && <ShareRewards />}
          {tab === "Share History" && <ShareHistory />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
