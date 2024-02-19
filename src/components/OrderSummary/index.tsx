import React from "react";
import { Divider, Button } from "antd";

import arrowRightIcon from "../../assets/images/arrowRightIcon.svg";
import Points from "../Points";
import PaypalButton from "../PaypalButton";

interface OrderSummaryType {
  cart?: boolean;
  checkout?: boolean;
  goTo: () => void;
  loading?: boolean;
  subTotal?: number;
  total?: number;
  price?: number;
  isPaypal?: boolean;
  deliveryCharges?: number;
  isDelivery?: boolean;
}

const OrderSummary: React.FC<OrderSummaryType> = (props) => {
  const {
    cart,
    checkout,
    goTo,
    loading,
    subTotal = 0,
    total = 0,
    price = 0,
    isPaypal = false,
    deliveryCharges = 0,
    isDelivery = true,
  } = props;

  return (
    <div className="orderSummary">
      <p>Order Summary</p>
      <div className="labelNumber">
        <label>Subtotal</label>
        <div>
          <Points points={subTotal} />
          {/* {!!price && <p style={styles.price}>${price}</p>} */}
        </div>
      </div>
      {isDelivery && (
        <div className="labelNumber">
          <label>Delivery Fee</label>
          <div>
            <Points points={deliveryCharges} />
          </div>
        </div>
      )}
      <Divider className="SUMMARY_DIVIDER" />
      <div className="labelNumber">
        <label>Total</label>
        <div>
          <Points points={total} />
          {!!price && (
            <p style={{ ...styles.price, textAlign: "right" }}>${price}</p>
          )}
        </div>
      </div>
      {isPaypal ? (
        <PaypalButton price={price} goTo={goTo} />
      ) : (
        <Button
          className="primaryButton customBTN"
          onClick={goTo}
          loading={loading}
        >
          {cart && "Go to Checkout"}
          {checkout && "Confirm"}

          <img src={arrowRightIcon} alt="arrow" />
        </Button>
      )}
    </div>
  );
};
const styles = {
  price: {
    color: "var(--darkGray)",
    fontFamily: "Sora",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "32px",
    letterSpacing: "-0.16px",
  },
};
export default OrderSummary;
