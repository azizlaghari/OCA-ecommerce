import React, { useState, useEffect } from "react";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";

import { useNavigate } from "react-router-dom";

import ProfileIcon from "../../assets/images/profile.svg";
import LoginAndSecurity from "../../assets/images/shield-security.svg";
import OrderHistory from "../../assets/images/keyboard.svg";
import ShareRewards from "../../assets/images/coin.svg";
import Logout from "../../assets/images/logout.svg";
import Share from "../../assets/images/share.png";
import { logout } from "../../store/services/auth";

const ProfileDropdown: React.FC = () => {
  const [windowSize, setWindowSize] = useState<boolean>();
  const navigate = useNavigate();

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth < 500 ? true : false);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  interface Item {
    name: string;
    navigateTo: string;
    icon: string;
  }

  const Item = ({ name, navigateTo, icon }: Item) => {
    return (
      <div
        className={`profile_dropdown_item`}
        onClick={() =>
          navigateTo === "logout-call" ? logout() : navigate(navigateTo)
        }
      >
        <div className="icon_box">
          <img src={icon} alt={"Icon"} />
        </div>
        <p>{name}</p>
      </div>
    );
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Item
          name="Personal information"
          navigateTo={"/settings?active=personalInformation"}
          icon={ProfileIcon}
        />
      ),
    },
    {
      key: "2",
      label: (
        <Item
          name="Login and Security"
          navigateTo={"/settings?active=loginAndSecurity"}
          icon={LoginAndSecurity}
        />
      ),
    },
    {
      key: "3",
      label: (
        <Item
          name="Order History"
          navigateTo={"/settings?active=orderHistory"}
          icon={OrderHistory}
        />
      ),
    },
    {
      key: "4",
      label: (
        <Item
          name="Share Rewards"
          navigateTo={"/settings?active=shareRewards"}
          icon={ShareRewards}
        />
      ),
    },
    {
      key: "5",
      label: (
        <Item
          name="Share History"
          navigateTo={"/settings?active=shareHistory"}
          icon={Share}
        />
      ),
    },
    {
      key: "6",
      label: <Item name="Logout" navigateTo={"logout-call"} icon={Logout} />,
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement={windowSize ? "bottomCenter" : "bottomRight"}
      arrow
      trigger={["click"]}
      overlayClassName="profile_dropdown"
    >
      <img src={ProfileIcon} alt={"Profile"} />
    </Dropdown>
  );
};

export default ProfileDropdown;
