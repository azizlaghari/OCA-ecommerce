import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";

import star from "../../../assets/images/star.svg";

import { getShareHistory } from "../../../store/services/rewards";
import { useAppSelector } from "../../../store/hooks";
import {
  ShareHistoryType,
  SharedUser,
} from "../../../store/interfaces/settings";

const ShareHistory: React.FC = () => {
  const { shareHistory } = useAppSelector((state) => state.settings);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    _shareHistory();
  }, []);

  const _shareHistory = async () => {
    setLoading(true);
    await getShareHistory();
    setLoading(false);
  };

  const columns = [
    {
      title: "Shared To",
      dataIndex: "sharedTo",
      key: "sharedTo",
      render: (sharedTo: SharedUser) => (
        <div>
          <p>{`${sharedTo?.firstName} ${sharedTo?.lastName}`}</p>
          <p>{`${sharedTo?.email}`}</p>
        </div>
      ),
    },
    {
      title: "Shared By",
      dataIndex: "sharedBy",
      key: "sharedBy",
      render: (sharedBy: SharedUser) => (
        <div>
          <p>{`${sharedBy?.firstName} ${sharedBy?.lastName}`}</p>
          <p>{`${sharedBy?.email}`}</p>
        </div>
      ),
    },
    {
      title: "Points Shared",
      dataIndex: "pointsShared",
      key: "pointsShared",
      render: (pointsShared: string) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={star} alt="star" height={20} width={20} />
          <p style={{ paddingLeft: "5px" }}>{pointsShared}</p>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp: Date) => (
        <p>
          {new Date(timestamp).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
      ),
    },
  ];

  return (
    <div className="share_history_container">
      <h2 className="setting_heading">Share History</h2>
      {loading ? (
        <div className="NoHistory">
          <Spin size="large" style={{ paddingTop: "40px" }} />
        </div>
      ) : shareHistory?.length >= 1 ? (
        <div className="shareTableContainer">
          <Table
            dataSource={shareHistory}
            columns={columns}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1000 }}
            rowKey={(record: ShareHistoryType) => record?._id}
          />
        </div>
      ) : (
        <div className="NoHistory">
          <div className="empty">
            <img src={star} alt="emptyHistory" />
            <p className="emptyText">No Share History</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareHistory;
