import React, { useState } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import OtpInput from "react-otp-input";

import { IoIosEyeOff, IoIosEye } from "react-icons/io";

import { ChangePassType } from "../../../store/interfaces/Auth";

import { useNavigate, useLocation } from "react-router-dom";

import { maskEmail } from "../../../utils";
import { passwordPattern } from "../../../config/constants";
import { resetPassword } from "../../../store/services/auth";
import Logo from "../Logo";

const PasswordChange: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();

  const onFinish = async (values: ChangePassType) => {
    setLoading(true);
    const obj = {
      passwordResetToken: Number(values.passwordResetToken),
      password: values.password,
      email: state.email,
    };
    const res = await resetPassword(obj);
    if (res) {
      navigate("/login", {
        state: { email: state.email },
      });
    }
    setLoading(false);
  };

  const handleTerms = (e: CheckboxChangeEvent) => {};

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
          <h2 className="heading">Change password</h2>
          <p className="sub_heading">
            We have sent you confirmation code on your email. <br />{" "}
            {maskEmail(state.email)}
          </p>
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            requiredMark={false}
            autoComplete="off"
          >
            <Form.Item
              label="Verification Code"
              name="passwordResetToken"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <OtpInput
                value={otp}
                onChange={setOtp}
                placeholder="000000"
                inputType="number"
                inputStyle="OPTinput"
                containerStyle="containerStyle"
                numInputs={6}
                renderSeparator={" "}
                renderInput={(props: any) => <input {...props} />}
              />
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
              name="confirmPassword"
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
              Change Password
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
