import React, { useState, useEffect } from "react";

import { Button, Table, Dropdown, Input, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { MenuProps } from "antd";

import moment from "moment";

import DashboardIcon from "../../../assets/images/dashboard.svg";
import { HiFilter, HiOutlineDotsVertical } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import Points from "../../../components/Points";
import { getOrderHistory } from "../../../store/services/order";
import { useAppSelector } from "../../../store/hooks";
import { OrderHistoryType } from "../../../store/interfaces/settings";

const OrderHistory: React.FC = () => {
  const { orderHistory } = useAppSelector((state) => state.settings);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeBtn, setActiveBtn] = useState<string>("All");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    await getOrderHistory();
    setLoading(false);
  };

  // const start = () => {
  //   setLoading(true);
  //   // ajax request after empty completing
  //   setTimeout(() => {
  //     setSelectedRowKeys([]);
  //     setLoading(false);
  //   }, 1000);
  // };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // const hasSelected = selectedRowKeys.length > 0;

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
    // {
    //   title: "Payment Status",
    //   dataIndex: "paymentStatus",
    //   render: (t) => (
    //     <div
    //       className="status"
    //       style={{ backgroundColor: "var(--lightGreen)" }}
    //     >
    //       <GoDotFill color="var(--darkGreen)" />
    //       <span>{t}</span>
    //     </div>
    //   ),
    // },
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
    // {
    //   title: " ",
    //   dataIndex: "dropdown",
    //   render: () => (
    //     <Dropdown
    //       menu={{ items }}
    //       placement="bottomRight"
    //       arrow
    //       trigger={["click"]}
    //     >
    //       <HiOutlineDotsVertical
    //         size={20}
    //         color="var(--mainBlue)"
    //         className="cursor"
    //       />
    //     </Dropdown>
    //   ),
    // },
  ];

  // const data: DataType[] = [];
  // for (let i = 0; i < 10; i++) {
  //   data.push({
  //     key: i,
  //     orderNumber: `37483jd83${i}`,
  //     customerName: `John Doe ${i}`,
  //     paymentStatus: `Completed`,
  //     points: <Points />,
  //     address: `Los Angeles ${i}`,
  //     orderDate: new Date(),
  //     status: "Confirmed",
  //   });
  // }

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <p onClick={() => setFilter("Label 1")}>Label 1</p>,
    },
    {
      key: "2",
      label: <p onClick={() => setFilter("Label 2")}>Label 2</p>,
    },
    {
      key: "3",
      label: <p onClick={() => setFilter("Label 3")}>Label 3</p>,
    },
  ];

  const filterData = orderHistory?.filter((v) => {
    const isMatchingStatus =
      activeBtn === "All" || v?.orderStatus === activeBtn;
    const isMatchingSearch =
      search === "" ||
      v?.user?.firstName.toLowerCase().includes(search.toLowerCase()) ||
      v?.user?.lastName.toLowerCase().includes(search.toLowerCase());
    // v?.user?.email.toLowerCase().includes(search.toLowerCase());
    // v?.createdAt.toLowerCase().includes(search.toLowerCase());

    return isMatchingStatus && isMatchingSearch;
  });

  return (
    <div className="order_history_container">
      <h2 className="setting_heading">Order History</h2>

      <div className="button_box">
        {["All", "Completed", "Pending", "Refected"].map((v) => {
          return (
            <Button
              key={v}
              type="primary"
              className={`${
                activeBtn === v ? "primaryButton" : "outlinedButton"
              }`}
              onClick={() => setActiveBtn(v)}
            >
              {activeBtn === v ? v : <span className="gradientText">{v}</span>}
            </Button>
          );
        })}
      </div>

      <div className="order_table_container">
        <div className="table_header">
          <Dropdown
            menu={{ items }}
            placement="bottomLeft"
            arrow
            trigger={["click"]}
          >
            <Button
              icon={
                <HiFilter
                  size={20}
                  color="var(--mainBlue)"
                  style={{ marginBottom: "-3px" }}
                />
              }
              className="filter_button"
            >
              Filter
            </Button>
          </Dropdown>
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
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filterData?.map((v) => {
            return {
              ...v,
              key: v?._id,
            };
          })}
          scroll={{ x: 1100 }}
          pagination={false}
        />
        <div className="table_footer">
          <Pagination
            total={40}
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
