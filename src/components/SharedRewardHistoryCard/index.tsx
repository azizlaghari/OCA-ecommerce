import { Divider } from "antd";
import React from "react";
import star from "../../assets/images/star.svg";
import { ShareRewardHistory } from "./interface";

const ShareRewardHistoryCard: React.FC<ShareRewardHistory> = ({ data }) => {
  return (
    <div className="card">
      <div className="sharedBox">
        <div className="sharedTo">
          <div className="pointsBox">
            <img src={star} alt="star" height={40} width={40} />
            <p className="points">{`Shared ${data?.pointsShared} Points`}</p>
          </div>
          <Divider />
          <div className="To">
            <strong>To:</strong>
            <div className="ToBio">
              <p>{`${data.sharedTo.firstName} ${data.sharedTo.lastName}`}</p>
              <p>{`${data.sharedTo.email}`}</p>
            </div>
          </div>
          <Divider />
          <div className="from">
            <strong>From:</strong>
            <div className="fromBio">
              <p>{`${data.sharedBy.firstName} ${data.sharedBy.lastName}`}</p>
              <p>{`${data.sharedBy.email}`}</p>
            </div>
          </div>
          <Divider />
          <div className="date">
            <p>
              On{" "}
              {new Date(data.timestamp).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareRewardHistoryCard;
