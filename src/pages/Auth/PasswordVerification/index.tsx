import React, { useState } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

import { useNavigate } from "react-router-dom";

import { LoginType } from "../../../store/interfaces/Auth";
import { createPassword } from "../../../store/services/auth";
import { passwordPattern } from "../../../config/constants";

import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import Logo from "../Logo";

const PasswordVerification: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async (values: LoginType) => {
    setLoading(true);
    const res = await createPassword({
      email: String(localStorage.getItem("email")),
      password: values?.password,
    });
    if (res) navigate("/login");
    setLoading(false);
  };

  const handleTerms = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
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
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  validator: async (_, value) => {
                    if (!value) {
                      return Promise.reject("Required");
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
            <Form.Item
              label="Confirm Password"
              name="conformPassword"
              dependencies={["password"]}
              rules={[
                {
                  validator: async (_, value) => {
                    const passwordFieldValue = form.getFieldValue("password");
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
            <div className="terms_and_condition_box">
              <div>
                <Checkbox onChange={handleTerms} />
              </div>
              <p>
                By creating an account means you agree to the{" "}
                <strong>Terms and Conditions</strong>, and our{" "}
                <strong>Privacy Policy</strong>
              </p>
            </div>
            <Button
              className="primaryButton"
              type="primary"
              loading={loading}
              htmlType="submit"
            >
              Create Password
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

export default PasswordVerification;
