import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Col,
  Row,
  Form,
  Input,
  Select,
  Spin,
  notification,
} from "antd";
import { Link, useNavigate } from "react-router-dom";

// import PaypalLogo from "../../../assets/images/paypal-logo.svg";
// import ApplePayLogo from "../../../assets/images/apple-pay-logo.svg";
// import GooglePayLogo from "../../../assets/images/google-pay-logo.svg";
// import BkashLogo from "../../../assets/images/bkash-logo.svg";

import Header from "../../../components/Header";
import CustomerReview from "../../../components/CustomerReview";
import Footer from "../../../components/Footer";
import CartCard from "../../../components/CartCard";
import OrderSummary from "../../../components/OrderSummary";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createOrder } from "../../../store/services/order";
import { getCart } from "../../../store/services/cart";
import { getDeliveryFee, getPoints } from "../../../utils";
import { getSettings } from "../../../store/services/settings";
import { setCart } from "../../../store/slices/cartSlice";
import { countryData } from "../../../config/countryData";

const Checkout: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state?.cart);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<string>("data");
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [cities, setCities] = useState<Array<{ value: string; label: string }>>(
    []
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    form.setFieldValue("country", "United State");
    _getCarts();
    return () => {
      dispatch(setCart([]));
      setDeliveryFee(0);
      setTotal(0);
    };
  }, []);

  useEffect(() => {
    if (cart?.length > 0) {
      const _total = getPoints(cart?.[0]?.products);
      const _delivery = getDeliveryFee(cart?.[0]?.products);
      setTotal(_total);
      setDeliveryFee(_delivery);
    }
  }, [cart]);

  const _getCarts = async () => {
    setLoading("data");
    await getSettings();
    await getCart();
    setLoading("");
  };

  const onFinish = async () => {
    setBtnLoading(true);
    const productsInCart = cart?.[0]?.products;
    const totalPoints = getPoints(cart?.[0]?.products);

    try {
      const address = {
        name: form.getFieldValue("name"),
        addressLine1: form.getFieldValue("addressLine1"),
        addressLine2: form.getFieldValue("addressLine2"),
        city: form.getFieldValue("city"),
        country: form.getFieldValue("country"),
        state: form.getFieldValue("state"),
        zipCode: form.getFieldValue("zipCode"),
        phoneNumber: form.getFieldValue("phoneNumber"),
      };
      const orderPayload = {
        shippingAddress: address,
        billingAddress: address,
        products: productsInCart,
      };
      await form.validateFields();
      if (user?.points && user?.points >= totalPoints) {
        const response = await createOrder(orderPayload);
        if (response) {
          navigate("/settings?active=orderHistory");
        }
      } else {
        notification.error({
          message: "Not enough points",
        });
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      window.scrollTo(0, 150);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="checkout_container_main">
      <Header />
      <div className="checkout_container layoutPaddingInline">
        <div className="breadcrumb">
          <Breadcrumb
            items={[
              {
                title: <Link to="/">Home</Link>,
              },
              {
                title: <Link to="/cart">Cart</Link>,
              },
              {
                title: (
                  <Link to="/checkout">
                    <p className="active_breadcrumb">Checkout</p>
                  </Link>
                ),
              },
            ]}
          />
        </div>
        <Form
          layout="vertical"
          form={form}
          requiredMark={false}
          autoComplete="off"
          onValuesChange={(e) => {
            if (e.state) {
              setCities(
                countryData[e.state]?.map((v: string) => {
                  return {
                    value: v,
                    label: v,
                  };
                })
              );
            }
          }}
        >
          <div className="checkout_body">
            <div className="cb_left">
              <Row gutter={[20, 0]}>
                <Col xs={24} sm={12}>
                  <p className="heading" style={{ marginTop: "24px" }}>
                    Shipping address
                  </p>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter your full name" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label="Address line 1"
                    name="addressLine1"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter address" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label="Address line 2"
                    name="addressLine2"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter address" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    name={"country"}
                    label="Country"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder={
                        <span className="select-placeholder">
                          Select Country
                        </span>
                      }
                      defaultValue={"United State"}
                      optionFilterProp="children"
                      filterOption={(
                        input: string,
                        option?: { label: string; value: string }
                      ) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={["United State"]?.map((v) => {
                        return {
                          value: v,
                          label: v,
                        };
                      })}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name={"state"}
                    label="State"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder={
                        <span className="select-placeholder">Select State</span>
                      }
                      optionFilterProp="children"
                      filterOption={(
                        input: string,
                        option?: { label: string; value: string }
                      ) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={Object?.keys(countryData)?.map((v) => {
                        return {
                          value: v,
                          label: v,
                        };
                      })}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="City"
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder={
                        <span className="select-placeholder">Select city</span>
                      }
                      optionFilterProp="children"
                      filterOption={(
                        input: string,
                        option?: { label: string; value: string }
                      ) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={cities}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Zip"
                    name="zipCode"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      type="number"
                      placeholder="Enter zip code"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Phone"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      type="number"
                      placeholder="Enter phone no."
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className="cb_right">
              <div
                style={{
                  border: "1px solid #0000001a",
                  borderRadius: "20px",
                }}
              >
                {loading === "data" ? (
                  <div className="empty_cart">
                    <Spin />
                  </div>
                ) : cart?.[0]?.products?.length > 0 ? (
                  cart?.[0]?.products?.map((v, i: number, arr) => {
                    const isLast = i === arr.length - 1;
                    return (
                      <CartCard
                        divider={!isLast ? true : false}
                        key={i}
                        data={v}
                      />
                    );
                  })
                ) : (
                  <div className="empty_cart">
                    <p>Empty</p>
                  </div>
                )}
              </div>

              <div
                style={{
                  border: "1px solid #0000001a",
                  borderRadius: "20px",
                  marginTop: "20px",
                }}
              >
                <OrderSummary
                  checkout
                  goTo={onFinish}
                  loading={btnLoading}
                  subTotal={total}
                  deliveryCharges={total && deliveryFee}
                  total={total && total + deliveryFee}
                />
              </div>
            </div>
          </div>
        </Form>
      </div>
      <CustomerReview />
      <Footer />
    </div>
  );
};

export default Checkout;
