import React, { useState } from "react";
import { Form, Input, Row, Col, Button } from "antd";

import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import { passwordPattern } from "../../../config/constants";
import { updatePassword } from "../../../store/services/auth";
import { UpdatePassType } from "../../../store/interfaces/Auth";

const LoginandSecurity: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: UpdatePassType) => {
    setLoading(true);
    const res = await updatePassword(values);
    if (res) {
      form.resetFields();
    }
    setLoading(false);
  };

  return (
    <div className="login_security_container">
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        requiredMark={false}
        autoComplete="off"
      >
        <Row gutter={[30, 10]}>
          <Col xs={24}>
            <div>
              <h2 className="setting_heading">Login and Security</h2>
            </div>
          </Col>
          <Col xs={24}>
            <div style={{ marginBlock: "20px" }}>
              <p className="setting_heading_small">Change password</p>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Current Password"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Enter current password"
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
          <Col xs={24} sm={12}>
            <Form.Item
              label="New Password"
              name="newPassword"
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
                placeholder="Enter new password"
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
        <Col xs={24}>
          <Button
            loading={loading}
            type="primary"
            className="primaryButton"
            style={{ width: "100%", height: "50px", marginTop: "20px" }}
            htmlType="submit"
          >
            Save Changes
          </Button>
        </Col>
      </Form>
    </div>
  );
};

// const ConnectedAccounts: React.FC = () => {
//   const connectedAccountsData = [
//     {
//       name: "Facebook",
//       icon: FacebookIcon,
//       description: "Connect your facebook account",
//     },
//     {
//       name: "Apple",
//       icon: AppleIcon,
//       description: "Connect your apple account",
//     },
//   ];
//   return (
//     <div className="conneted_accounts_box">
//       <p className="setting_heading_small">Connected Accounts</p>
//       <div className="c_account_body">
//         {connectedAccountsData?.map((v) => {
//           return (
//             <div key={v?.name} className="c_account_card">
//               <div className="icon_box">
//                 <img src={v?.icon} alt="Icon" />
//               </div>
//               <div className="name_box">
//                 <p>{v?.name}</p>
//                 <p>{v?.description}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const ConnectedDevices: React.FC = () => {
//   return (
//     <div className="conneted_device_box">
//       <p className="setting_heading_small">Connected Devices</p>
//       {Array(3)
//         .fill({
//           name: "Session",
//           device: "Windows",
//           date: "May 14, 2023 at 08:36pm",
//         })
//         ?.map((v, i) => {
//           return (
//             <div key={i} className="conneted_device_card">
//               <div className="cdc_left">
//                 <p className="session_name">{v?.name}</p>
//                 <div className="device_name_box">
//                   <img
//                     src={require("../../../assets/images/window.png")}
//                     alt={"Visa"}
//                   />
//                   <p>{v?.device}</p>
//                 </div>
//                 <p className="device_date">{v?.date}</p>
//               </div>
//               <div className="cdc_right">
//                 <Button type="primary" className="outlinedButton">
//                   <span className="gradientText">Logout</span>
//                 </Button>
//               </div>
//             </div>
//           );
//         })}
//     </div>
//   );
// };

export default LoginandSecurity;
