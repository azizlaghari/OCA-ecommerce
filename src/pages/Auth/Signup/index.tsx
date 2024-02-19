import React, { useState } from "react";

import { Button, Form, Input, Row, Col } from "antd";

import { useNavigate } from "react-router-dom";

import { SignupType } from "../../../store/interfaces/Auth";
import { register } from "../../../store/services/auth";
import { passwordPattern } from "../../../config/constants";

import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import Logo from "../Logo";

const Signup: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async (values: SignupType) => {
    setLoading(true);
    const obj = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      password: values?.password,
    };
    const res = await register(obj);
    if (res) {
      navigate("/code-verification", {
        state: {
          navigateTo: "/login",
          email: values?.email,
        },
      });
    }
    setLoading(false);
  };

  return (
    <div className="auth_container">
      <div
        className="left_container"
        style={{
          backgroundImage: `url(${require("../../../assets/images/signup-left-img.png")})`,
        }}
      >
        <div
          className="left_container_wrapper"
          style={{ backgroundColor: "transparent" }}
        >
          <Logo />
          <h2>Welcome to Sweetdeli!</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate
            ut laoreet velit ma.
          </p>
        </div>
      </div>
      <div className="right_container">
        <div className="form_wrapper">
          <h2 className="heading">Welcome!</h2>
          <p className="sub_heading">Meet the good taste today</p>
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            requiredMark={false}
            autoComplete="off"
          >
            <Row gutter={[20, 10]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter your first name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter your last name" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="E-mail"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                    {
                      type: "email",
                      message: "Invalid email address",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    type="email"
                    placeholder="Type your e-mail address"
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      validator: async (_, value) => {
                        if (!value) {
                          return Promise.reject("Required");
                        }
                        if (value.length < 8) {
                          return Promise.reject(
                            "Password must be at least 8 characters"
                          );
                        }
                        if (passwordPattern.test(value)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(
                            "Invalid password pattern (Password must contain atleast one uppercase letter, one special character and one number)"
                          );
                        }
                      },
                    },
                  ]}
                  validateTrigger={["onBlur"]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Enter password"
                    iconRender={(visible: Boolean) =>
                      visible ? (
                        <IoIosEye size={20} style={{ cursor: "pointer" }} />
                      ) : (
                        <IoIosEyeOff size={20} style={{ cursor: "pointer" }} />
                      )
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="Confirm Password"
                  name="conformPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      validator: async (_, value) => {
                        const passwordFieldValue =
                          form.getFieldValue("password");
                        if (!value) {
                          return Promise.reject("Required");
                        }
                        if (value === passwordFieldValue) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject("Passwords do not match");
                        }
                      },
                    },
                  ]}
                  validateTrigger={["onBlur"]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Confirm password"
                    iconRender={(visible: Boolean) =>
                      visible ? (
                        <IoIosEye size={20} style={{ cursor: "pointer" }} />
                      ) : (
                        <IoIosEyeOff size={20} style={{ cursor: "pointer" }} />
                      )
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Button
              className="primaryButton"
              type="primary"
              loading={loading}
              htmlType="submit"
            >
              Sign Up
            </Button>
          </Form>
          <div className="already_account_box">
            <p>
              Already Have an Account?{" "}
              <span onClick={() => navigate("/login")}>Sign In</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
