import React from "react";
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
        <div className="rewardPoints">
          <p>{data?.points}</p>
        </div>
      </div>
      <div className="product_detail">
        <p className="product_points">{data?.points} Points</p>
        <p className="product_price">${data?.price}</p>
      </div>
    </div>
  );
};

export default RewardCard;
