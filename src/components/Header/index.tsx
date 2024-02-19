import React from "react";
import {
  Badge,
  Button,
  // Input
} from "antd";

import { useNavigate } from "react-router-dom";

import BagIcon from "../../assets/images/bag.svg";
// import GlobeIcon from "../../assets/images/global-refresh.svg";
// import SearchIcon from "../../assets/images/search.svg";
import RewardIcon from "../../assets/images/reward-star.svg";
import { FaHeart } from "react-icons/fa6";

import ProfileDropdown from "./ProfileDropdown";
import { getToken } from "../../utils";
import { useAppSelector } from "../../store/hooks";

const Header: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const userWishlistCounts = user?.wishlist?.length;
  const userCartCounts = user?.cart?.length;
  const isUser = getToken();

  const navigate = useNavigate();

  return (
    <div className="main_header_container layoutPaddingInline">
      <div className="main_header">
        <div className="logo_box">
          <img
            src={require("../../assets/images/logo.png")}
            alt={"Logo"}
            onClick={() => navigate("/")}
          />
        </div>
        <div className="right_side">
          {/* <div className="search_input_box">
            <Input
              placeholder="Search"
              prefix={<img src={SearchIcon} alt={"Search"} />}
              allowClear
            />
          </div> */}
          {!isUser && (
            <>
              <Button
                type="primary"
                className="outlinedButton"
                onClick={() => navigate("/login")}
              >
                <span className="gradientText">Login</span>
              </Button>
              <Button
                type="primary"
                className="primaryButton"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </>
          )}
          {isUser && (
            <>
              <Badge
                size="default"
                count={userCartCounts}
                overflowCount={userCartCounts}
              >
                <img
                  src={BagIcon}
                  alt={"Bag"}
                  onClick={() =>
                    isUser ? navigate("/cart") : navigate("/login")
                  }
                />
              </Badge>
              <Badge
                size="default"
                count={userWishlistCounts}
                overflowCount={userWishlistCounts}
              >
                <FaHeart
                  size={22}
                  onClick={() =>
                    isUser ? navigate("/wishlist") : navigate("/login")
                  }
                  className="cursor"
                />
              </Badge>
              <ProfileDropdown />

              <div className="reward_box">
                <img
                  src={RewardIcon}
                  alt={"Reward"}
                  style={{ cursor: "default" }}
                  onClick={() => navigate("/rewards")}
                />
                <h3>{user?.points}</h3>
                {/* <Points points={user?.points} /> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
