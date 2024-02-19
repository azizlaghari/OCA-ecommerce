import React from "react";
import { Button, Form, Input, notification } from "antd";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { contactUs } from "../../../store/services/contactus";
import { ContactUsType } from "../../../store/interfaces/ContactUs";

const ContactUs: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: ContactUsType) => {
    try {
      await contactUs(values);
      notification.success({
        message: "Message sent",
        description: "Message sent successfully",
      });
      form.resetFields();
      // form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      notification.error({
        message: "Message not sent",
        description: "There was an error sending the message",
      });
    }
  };
  return (
    <div className="contact">
      <Header />
      <div className="contactContainer">
        <div className="left_container">
          <div className="form_wrapper">
            <h2 className="heading">Contact Us</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Integer at amet justo
              turpis. Ullamcorper maecenas arcu egestas duis. Libero sit
              tristique amet vivamus sit augue. Ultrices duis enim gravida eget
              amet viverra posuere.
            </p>
            <Form
              style={{ marginTop: "30px" }}
              layout="vertical"
              form={form}
              onFinish={onFinish}
              requiredMark={false}
              autoComplete="off"
            >
              <Form.Item
                label="Topic"
                name="topic"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Input size="large" placeholder="Select topic " />
              </Form.Item>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  gap: "1rem",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                  style={{ width: "50%" }}
                >
                  <Input size="large" placeholder="Enter your full name" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                  style={{ width: "50%" }}
                >
                  <Input
                    size="large"
                    type="email"
                    placeholder="Type your e-mail or phone number"
                  />
                </Form.Item>
              </div>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Input.TextArea
                  size="large"
                  placeholder="Enter you query in detail (0/500)"
                />
              </Form.Item>

              <Button
                className="primaryButton"
                type="primary"
                // loading={loading}
                style={{ width: "100%" }}
                htmlType="submit"
              >
                Send
              </Button>
            </Form>
          </div>
        </div>
        <div className="right_container">
          <div className="right_container_wrapper">
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              scrollWheelZoom={false}
              className="map"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
