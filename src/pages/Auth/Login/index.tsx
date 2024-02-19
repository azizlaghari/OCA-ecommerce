import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { LoginType } from "../../../store/interfaces/Auth";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import { login } from "../../../store/services/auth";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../Logo";
// import { emailPattern } from "../../../config/constants";

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const onFinish = async (values: LoginType) => {
    setLoading(true);
    const res = await login(values);
    if (res === "unverified") {
      navigate("/code-verification", {
        state: {
          navigateTo: "/login",
          email: values.email,
        },
      });
    }
    if (res === "verified") {
      window.location.reload();
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <div className="auth_container">
      <div
        className="left_container"
        style={{
          backgroundImage: `url(${require("../../../assets/images/login-left-img.jpeg")})`,
        }}
      >
        <div className="left_container_wrapper">
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
          <h2 className="heading">Welcome back!</h2>
          <p className="sub_heading">Meet the good taste today</p>
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            requiredMark={false}
            autoComplete="off"
            fields={
              state
                ? [
                    {
                      name: "email",
                      value: state.email,
                    },
                  ]
                : []
            }
          >
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
              <Input size="large" placeholder="Type your e-mail" />
            </Form.Item>
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
                    return Promise.resolve();
                  },
                },
              ]}
              validateTrigger={["onBlur"]}
            >
              <Input.Password
                size="large"
                placeholder="Type your password"
                iconRender={(visible: Boolean) =>
                  visible ? (
                    <IoIosEye size={20} style={{ cursor: "pointer" }} />
                  ) : (
                    <IoIosEyeOff size={20} style={{ cursor: "pointer" }} />
                  )
                }
              />
            </Form.Item>
            <div className="forgot_password_box">
              <p
                className="gradientText"
                onClick={() => navigate("/email-verification")}
              >
                Forgot password
              </p>
            </div>
            <Button
              className="primaryButton"
              type="primary"
              loading={loading}
              htmlType="submit"
            >
              Sign In
            </Button>
          </Form>
          <div className="already_account_box">
            <p>
              Don't Have an Account?{" "}
              <span onClick={() => navigate("/signup")}>Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
