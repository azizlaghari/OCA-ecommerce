import React, { useState, useEffect } from "react";

import { Button, Table, Input, Pagination } from "antd";

import moment from "moment";

import DashboardIcon from "../../../assets/images/dashboard.svg";
import { RiSearchLine } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";

import { getOrderHistory } from "../../../store/services/order";
import { useAppSelector } from "../../../store/hooks";
import { OrderHistoryType } from "../../../store/interfaces/settings";

const OrderHistory: React.FC = () => {
  const { orderHistory } = useAppSelector((state) => state.settings);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeBtn, setActiveBtn] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    await getOrderHistory();
    setLoading(false);
  };

  const columns = [
    {
      title: " ",
      dataIndex: "icon",
      render: () => (
        <div>
          <img
            style={{ marginBottom: "-3px" }}
            src={DashboardIcon}
            alt={"Icon"}
          />
        </div>
      ),
    },
    {
      title: "Order number",
      dataIndex: "_id",
      render: (t: string) => <p>{t?.slice(0, 10)}</p>,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      render: (t: string, obj: OrderHistoryType) => (
        <p>
          {obj?.user?.firstName} {obj?.user?.lastName}
        </p>
      ),
    },
    {
      title: "Points",
      dataIndex: "points",
      render: (t: string, obj: OrderHistoryType) => (
        <p>{obj?.priceInformation?.total}</p>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (t: string, obj: OrderHistoryType) => (
        <p>{obj?.shippingAddress?.addressLine1}</p>
      ),
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      render: (t: string) => <p>{moment(t).format("MMMM DD YYYY")}</p>,
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      render: (t: string) => (
        <div
          className={`status ${
            t === "Pending"
              ? "lightOrange"
              : t === "Completed"
              ? "lightGreen"
              : t === "Cancelled"
              ? "lightRed"
              : ""
          }`}
        >
          <GoDotFill />
          <span>{t}</span>
        </div>
      ),
    },
  ];

  const filterData = orderHistory?.filter((v) => {
    const isMatchingStatus =
      activeBtn === "All" || v?.orderStatus === activeBtn;
    const isMatchingSearch =
      search === "" ||
      v?.user?.firstName.toLowerCase().includes(search.toLowerCase()) ||
      v?.user?.lastName.toLowerCase().includes(search.toLowerCase());

    return isMatchingStatus && isMatchingSearch;
  });

  return (
    <div className="order_history_container">
      <h2 className="setting_heading">Order History</h2>

      <div className="button_box">
        {["All", "Completed", "Pending", "Cancelled"].map((v) => {
          return (
            <Button
              key={v}
              type="primary"
              className={`${
                activeBtn === v ? "primaryButton" : "outlinedButton"
              }`}
              onClick={() => setActiveBtn(v)}
            >
              {activeBtn === v ? (
                v === "Cancelled" ? (
                  "Refected"
                ) : (
                  v
                )
              ) : (
                <span className="gradientText">
                  {v === "Cancelled" ? "Refected" : v}
                </span>
              )}
            </Button>
          );
        })}
      </div>

      <div className="order_table_container">
        <div className="table_header">
          <div className="search_input">
            <Input
              placeholder="Search Users by Name"
              prefix={<RiSearchLine size={20} color="var(--mainBlue)" />}
              allowClear
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={filterData?.map((v) => {
            return {
              ...v,
              key: v?._id,
            };
          })}
          scroll={{ x: 1100 }}
          pagination={false}
          rowKey={"key"}
        />
        <div className="table_footer">
          <Pagination
            total={filterData?.length}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
            defaultPageSize={10}
            defaultCurrent={1}
            showSizeChanger
            locale={{ items_per_page: "Rows per page" }}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;