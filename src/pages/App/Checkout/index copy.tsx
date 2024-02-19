import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Col,
  Row,
  Form,
  Input,
  Button,
  Select,
  Checkbox,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

import PaypalLogo from "../../../assets/images/paypal-logo.svg";
import ApplePayLogo from "../../../assets/images/apple-pay-logo.svg";
import GooglePayLogo from "../../../assets/images/google-pay-logo.svg";
import BkashLogo from "../../../assets/images/bkash-logo.svg";

import Header from "../../../components/Header";
import CustomerReview from "../../../components/CustomerReview";
import Footer from "../../../components/Footer";
import CartCard from "../../../components/CartCard";
import OrderSummary from "../../../components/OrderSummary";
import { useAppSelector } from "../../../store/hooks";
import { createOrder } from "../../../store/services/order";

const Checkout: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const orderCart = useAppSelector((state) => state?.cart);
  const { user } = useAppSelector((state) => state.auth);

  const handleSameAddress = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      form.setFieldValue("b-name", form.getFieldValue("name"));
      form.setFieldValue("b-addressLine1", form.getFieldValue("addressLine1"));
      form.setFieldValue("b-addressLine2", form.getFieldValue("addressLine2"));
      form.setFieldValue("b-city", form.getFieldValue("city"));
      form.setFieldValue("b-country", form.getFieldValue("country"));
      form.setFieldValue("b-state", form.getFieldValue("state"));
      form.setFieldValue("b-zipCode", form.getFieldValue("zipCode"));
      form.setFieldValue("b-phoneNumber", form.getFieldValue("phoneNumber"));
    } else {
      form.setFieldValue("b-name", "");
      form.setFieldValue("b-addressLine1", "");
      form.setFieldValue("b-addressLine2", "");
      form.setFieldValue("b-city", "");
      form.setFieldValue("b-country", undefined);
      form.setFieldValue("b-state", undefined);
      form.setFieldValue("b-zipCode", "");
      form.setFieldValue("b-phoneNumber", "");
    }
  };
  const onFinish = () => {
    onConfirm();
  };
  const onConfirm = async () => {
    setLoading(true);
    const productsInCart = orderCart?.cart?.[0]?.products;
    const totalPoints = productsInCart.reduce(
      (
        acc: number,
        product: { product: { points: number }; quantity: number }
      ) => acc + (product.product.points || 0) * product.quantity,
      0
    );
    try {
      const orderPayload = {
        shippingAddress: {
          name: form.getFieldValue("name"),
          addressLine1: form.getFieldValue("addressLine1"),
          addressLine2: form.getFieldValue("addressLine2"),
          city: form.getFieldValue("city"),
          country: form.getFieldValue("country"),
          state: form.getFieldValue("state"),
          zipCode: form.getFieldValue("zipCode"),
          phoneNumber: form.getFieldValue("phoneNumber"),
        },
        billingAddress: {
          name: form.getFieldValue("b-name"),
          addressLine1: form.getFieldValue("b-addressLine1"),
          addressLine2: form.getFieldValue("b-addressLine2"),
          city: form.getFieldValue("b-city"),
          country: form.getFieldValue("b-country"),
          state: form.getFieldValue("b-state"),
          zipCode: form.getFieldValue("b-zipCode"),
          phoneNumber: form.getFieldValue("b-phoneNumber"),
        },
        products: productsInCart,
      };
      await form.validateFields();
      if (user?.points && user?.points >= totalPoints) {
        const response = await createOrder(orderPayload);
      } else {
        console.error(" Not enough points");
      }
    } catch (error) {
      console.error("Error confirming order:", error);
    } finally {
      setLoading(false);
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
          // autoComplete="off"
        >
          <div className="checkout_body">
            <div className="cb_left">
              <p className="heading">Express checkout</p>
              <div className="express_payment_box">
                <div className="paypal_box">
                  <p>Buy With</p>
                  <img src={PaypalLogo} />
                </div>
                <div className="apple_pay_box">
                  <p>Pay With</p>
                  <img src={ApplePayLogo} />
                </div>
                <div className="google_pay_box">
                  <img src={GooglePayLogo} />
                </div>
                <div className="bkash_pay_box">
                  <p>Pay With</p>
                  <img src={BkashLogo} />
                </div>
              </div>
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
                    label="City"
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter your city" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
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
                      optionFilterProp="children"
                      filterOption={(
                        input: string,
                        option?: { label: string; value: string }
                      ) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={["Pakistan"]?.map((v) => {
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
                      options={["Sindh"]?.map((v) => {
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
                <Col xs={24}>
                  <p className="heading" style={{ marginTop: "10px" }}>
                    Billing address
                  </p>
                </Col>
                <Col xs={24}>
                  <div className="same_address_box">
                    <Checkbox onChange={handleSameAddress} />
                    <p>Same as billing address</p>
                  </div>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    label="Name"
                    name="b-name"
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
                    name="b-addressLine1"
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
                    name="b-addressLine2"
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
                    label="City"
                    name="b-city"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter your city" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name={"b-country"}
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
                      optionFilterProp="children"
                      filterOption={(
                        input: string,
                        option?: { label: string; value: string }
                      ) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={["Pakistan"]?.map((v) => {
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
                    name={"b-state"}
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
                      options={["Sindh"]?.map((v) => {
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
                    label="Zip"
                    name="b-zipCode"
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
                    name="b-phoneNumber"
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
                {orderCart?.cart?.[0]?.products?.map((v, i: number, arr) => {
                  const isLast = i === arr.length - 1;
                  return (
                    <CartCard
                      divider={!isLast ? true : false}
                      key={i}
                      data={v}
                    />
                  );
                })}
              </div>

              <div
                style={{
                  border: "1px solid #0000001a",
                  borderRadius: "20px",
                  marginTop: "20px",
                }}
              >
                <OrderSummary checkout goTo={onFinish} />
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
