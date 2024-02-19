import React, { useEffect } from "react";
import { Breadcrumb } from "antd";

import { Link, useLocation } from "react-router-dom";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CustomerReview from "../../../components/CustomerReview";
import OrderSummary from "../../../components/OrderSummary";

import reward_1000_star from "../../../assets/images/reward-bg.png";

import { buyReward } from "../../../store/services/rewards";

import Start from "../../../assets/images/reward-star.svg";

const OrderSummaryPage: React.FC = () => {
  const location = useLocation();
  const rewardData = location.state?.rewardData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onConfirm = async () => {
    try {
      const data = await buyReward(rewardData?._id);
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <div className="OrderSummary">
      <Header />
      <div className="breadcrumb layoutPaddingInline">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
            {
              title: (
                <Link to="/cart">
                  <p className="cartBreadcrumb">Cart</p>
                </Link>
              ),
            },
            {
              title: (
                <Link to="/order-summary">
                  <p className="active_breadcrumb">Checkout</p>
                </Link>
              ),
            },
          ]}
        />
      </div>
      <div className="orderSummaryContent layoutPaddingInline">
        {/* <img src={reward_1000_star} alt="reward" />
        <p className="buyPoints">{rewardData?.points}</p> */}
        <RewardImage title={"Get"} price={rewardData?.points} />
        <div
          className="summaryWrapper"
          style={{
            border: "1px solid #0000001a",
            borderRadius: "20px",
            marginTop: "20px",
          }}
        >
          <OrderSummary
            checkout
            goTo={onConfirm}
            price={rewardData?.price}
            subTotal={rewardData?.points}
            total={rewardData?.points}
            isPaypal={true}
            isDelivery={false}
          />
        </div>
      </div>
      <CustomerReview />
      <Footer />
    </div>
  );
};

const RewardImage = ({ title, price }: { title: string; price: number }) => {
  return (
    <div className="reward_image_box">
      <div className="ri_left">
        <img src={require("../../../assets/images/reward1.png")} alt="Icon" />
      </div>
      <div className="ri_center">
        <p className="title">{title}</p>
        <img src={Start} alt="Icon" />
        <p className="price">{price}</p>
      </div>
      <div className="ri_right">
        <img src={require("../../../assets/images/reward2.png")} alt="Icon" />
      </div>
    </div>
  );
};

export default OrderSummaryPage;
