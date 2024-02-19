import React, { useState } from "react";
import { Button, Form, Input } from "antd";

import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../store/services/auth";
import Logo from "../Logo";

const EmailVerification: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    const res = await forgotPassword(values.email);
    if (res) {
      navigate("/password-change", {
        state: {
          email: values.email,
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
          <h2 className="heading">Change password</h2>
          <p className="sub_heading">
            We will send you confirmation code on this email.
          </p>
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            requiredMark={false}
            autoComplete="off"
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
              <Input size="large" type="email" placeholder="Type your e-mail" />
            </Form.Item>
            <Button
              className="primaryButton"
              type="primary"
              loading={loading}
              htmlType="submit"
            >
              Send Code
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
