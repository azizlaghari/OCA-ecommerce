import React, { useState } from "react";
import { Button, Form } from "antd";
import { verifyEmail } from "../../../store/services/auth";
import { useNavigate, useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";
import { maskEmail } from "../../../utils";
import Logo from "../Logo";

const CodeVerification: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState("");

  const { state } = useLocation();

  const navigate = useNavigate();

  const handlePaste: React.ClipboardEventHandler = (event) => {
    const data = event.clipboardData.getData("text");
  };

  const onFinish = async (values: { code: string }) => {
    setLoading(true);
    const res = await verifyEmail({
      email: state.email,
      emailVerificationToken: Number(values.code),
    });
    if (res) {
      navigate(state.navigateTo, { state: { email: state.email } });
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
          <h2 className="heading">Verification Code</h2>
          <p className="sub_heading" style={{ marginBottom: "0px" }}>
            We have sent you confirmation code on your email. <br />
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
              label=" "
              name="code"
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
                onPaste={handlePaste}
                numInputs={6}
                renderSeparator={" "}
                renderInput={(props: any) => <input {...props} />}
              />
            </Form.Item>

            <Button
              className="primaryButton"
              type="primary"
              loading={loading}
              htmlType="submit"
            >
              Confirm
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CodeVerification;
