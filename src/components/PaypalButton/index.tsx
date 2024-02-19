import React, { useState } from "react";
import { Spin } from "antd";

import { PayPalButton } from "react-paypal-button-v2";

interface PaypalButtonType {
  cart?: boolean;
  checkout?: boolean;
  goTo: () => void;
  loading?: boolean;
  subTotal?: number;
  total?: number;
  price: number;
  isPaypal?: boolean;
}

const PaypalButton: React.FC<PaypalButtonType> = ({
  price,
  goTo,
  // isPaypal,
}) => {
  const [isPaypalButtonLoaded, setIsPaypalButtonLoaded] =
    useState<boolean>(false);
  return (
    <>
      {!isPaypalButtonLoaded && (
        <div className="paypal_btn_loading">
          <Spin />
        </div>
      )}
      <PayPalButton
        amount={price}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={() => {
          // alert("Transaction completed by " + details.payer.name.given_name);
          // OPTIONAL: Call your server to save the transaction
          goTo();
        }}
        onError={(err: any) => {
          console.log("🚀 ~ err:", err);
          return {};
        }}
        options={{
          clientId:
            "ATmB61i4k7quMltrrfQ8IBGK4pCwbTbStBoi11Od1z4PES4_1zm9y-hdOYkAPle_yUdqZ_1qEAHzk4Td",

          disableFunding: "paylater",
        }}
        onButtonReady={() => setIsPaypalButtonLoaded(true)}
      />
    </>
  );
};

export default PaypalButton;
