import React from "react";
// import { FaHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RewardsType } from "../../store/interfaces/Rewards";

interface Props {
  data: RewardsType;
}

const RewardCard: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="RewardCard"
      onClick={() =>
        navigate("/order-summary", { state: { rewardData: data } })
      }
    >
      <div
        className="product_image"
        style={{
          backgroundImage: `url(${require("../../assets/images/reward-bg.png")})`,
        }}
      >
        {/* <img src={data?.image} alt="rewards" /> */}
        {/* <div className="rating_box">
          <FaStar /> <span>4.5</span>
        </div> */}
        <div className="rewardPoints">
          <p>{data?.points}</p>
        </div>
        {/* <div className="wishlist_box">
          <FaHeart />
        </div> */}
      </div>
      <div className="product_detail">
        <p className="product_points">{data?.points} points</p>
        <p className="product_price">${data?.price}</p>
      </div>
    </div>
  );
};

export default RewardCard;
