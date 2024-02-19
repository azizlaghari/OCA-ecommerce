import React, { useState } from "react";
import { Form, Input, Row, Col, Button } from "antd";
import { useAppSelector } from "../../../store/hooks";
import { UpdateUserType } from "../../../store/interfaces/Auth";
import { updateUser } from "../../../store/services/auth";

const PersonalInformation: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: UpdateUserType) => {
    setLoading(true);
    const obj = { ...values };
    delete obj.email;
    await updateUser(obj);
    setLoading(false);
  };

  return (
    <div className="personal_info_box">
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        requiredMark={false}
        autoComplete="off"
        fields={
          user
            ? [
                {
                  name: "firstName",
                  value: user?.firstName,
                },
                {
                  name: "lastName",
                  value: user?.lastName,
                },
                {
                  name: "phoneNumber",
                  value: user?.phoneNumber,
                },
                {
                  name: "email",
                  value: user?.email,
                },
                {
                  name: "addressLine1",
                  value: user?.addressLine1,
                },
                {
                  name: "addressLine2",
                  value: user?.addressLine2,
                },
              ]
            : []
        }
      >
        <Row gutter={[30, 10]}>
          <Col xs={24}>
            <div>
              <h2 className="setting_heading">Personal Information</h2>
            </div>
          </Col>
          <Col xs={24}>
            <div style={{ marginBlock: "10px" }}>
              <p className="setting_heading_small">Account info</p>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="First name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input size="large" placeholder="Enter first name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Last name"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input size="large" placeholder="Enter last name" />
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
                placeholder="Enter phone number"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Email address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input
                size="large"
                type="email"
                placeholder="Enter email address"
                disabled
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Address Line 1"
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
          <Col xs={24} sm={12}>
            <Form.Item
              label="Address Line 2"
              name="addressLine2"
              rules={[
                {
                  required: false,
                  message: "Required",
                },
              ]}
            >
              <Input size="large" placeholder="Enter address" />
            </Form.Item>
          </Col>
          {/* <Col xs={24}>
            <ConnectedCard />
          </Col>
          <Col xs={24}>
            <p className="setting_heading_small">Add another card</p>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label="Account number"
              name="accountNumber"
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
                placeholder="Enter account number"
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label="Account title"
              name="accountTitle"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input size="large" placeholder="Enter account title" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label="DOE"
              name="dateOfExpire"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
                // {
                //   validator: validateExpiryDate,
                // },
              ]}
            >
              <Input size="large" placeholder="MM/YY" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label="Cvv"
              name="cvv"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input size="large" type="number" placeholder="Enter CVV" />
            </Form.Item>
          </Col> */}
          <Col xs={24}>
            <Button
              loading={loading}
              type="primary"
              className="primaryButton"
              style={{ width: "100%", height: "50px" }}
              htmlType="submit"
            >
              Save Changes
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

// const ConnectedCard: React.FC = () => {
//   return (
//     <div className="conneted_card_box">
//       <p className="setting_heading_small">Connected Card</p>
//       {Array(1)
//         .fill({
//           name: "Harry Maguire",
//           cardNumber: "34783xxxxc9839",
//           date: "May 14, 2023 at 08:36pm",
//         })
//         ?.map((v, i) => {
//           return (
//             <div key={i} className="conneted_card_card">
//               <div className="cdc_left">
//                 <p className="card_name">{v?.name}</p>
//                 <div className="card_number_box">
//                   <img
//                     src={require("../../../assets/images/visa.png")}
//                     alt={"Visa"}
//                   />
//                   <p>{v?.cardNumber}</p>
//                 </div>
//                 <p className="card_date">{v?.date}</p>
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

export default PersonalInformation;
