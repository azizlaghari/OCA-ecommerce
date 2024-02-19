import React, { useState } from "react";
import { Button, Col } from "antd";

import star from "../../../assets/images/star.svg";
import reward1 from "../../../assets/images/reward1.png";
import reward2 from "../../../assets/images/reward2.png";

import RewardModal from "../../../components/Modals/RewardModal";

import { useAppSelector } from "../../../store/hooks";

const ShareRewards: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const showModal = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className="share_rewards_container">
      <h2 className="setting_heading">Share Reward</h2>
      <Col lg={24}>
        <div className="reward">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={reward1} alt="reward" />
            <div className="rewardCol">
              <p>My rewards</p>
              <img src={star} alt="star" />
              <h3>{user?.points || 0}</h3>
            </div>
            <img src={reward2} alt="reward" />
          </div>
        </div>
        <div className="rewardText">
          <p>
            You can share you reward amount with your friends and make them
            happy as you are
          </p>
        </div>
        <div className="shareBtn">
          <Button
            type="primary"
            className="primaryButton"
            style={{ width: "50%", height: "60px" }}
            onClick={showModal}
          >
            Share Reward
          </Button>
        </div>
      </Col>

      <RewardModal isVisible={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default ShareRewards;
