import React from "react";
import Header from "../../../components/Header";
import CustomerReview from "../../../components/CustomerReview";
import Footer from "../../../components/Footer";
import { Col, Progress, Rate, Row } from "antd";
import { businessData, reviewData } from "./data";

const AboutUs = () => {
  return (
    <div className="about_us_container">
      <Header />
      <div className="about_us_body layoutPaddingInline">
        <div className="heading_box">
          <h1 className="heading">About Us</h1>
          <p className="description">
            Nunc egestas condimentum condimentum. Phasellus accumsan, sapien in
            commodo maximus, diam neque luctus enim, eget tristique dui massa ac
            orci. Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis
          </p>
        </div>
        <div className="story_section">
          <Row gutter={[20, 30]}>
            <Col xs={24} md={12}>
              <div className="story_left">
                <h2>Our Story</h2>
                <p>
                  When I opened Sugarplum Cake Shoppe in 2010, I began with the
                  question, “What makes people smile?” I found that what brings
                  a smile to any face is the perfectly baked treat, and while my
                  business has grown and changed, this focus has stayed the
                  same. My team and I strive to serve in a way that meets your
                  goal. We believe that each sweet treat is an opportunity to
                  bring joy to another person’s world. If You Can Dream It, We
                  Can Bake It!
                </p>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="story_right">
                <div>
                  <img
                    src={require("../../../assets/images/pic1.png")}
                    alt={"Story"}
                  />
                  <img
                    src={require("../../../assets/images/pic2.png")}
                    alt={"Story"}
                  />
                </div>
                <div>
                  <img
                    src={require("../../../assets/images/pic3.png")}
                    alt={"Story"}
                  />
                  <img
                    src={require("../../../assets/images/pic4.png")}
                    alt={"Story"}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="our_mission_section">
          <h2>Our Mission</h2>
          <p>
            When I opened Sugarplum Cake Shoppe in 2010, I began with the
            question, “What makes people smile?” I found that what brings a
            smile to any face is the perfectly baked treat, and while my
            business has grown and changed, this focus has stayed the same. My
            team and I strive to serve in a way that meets your goal. We believe
            that each sweet treat is an opportunity to bring joy to another
            person’s world. If You Can Dream It, We Can Bake It!
          </p>
        </div>
        <div className="business_section">
          <Row gutter={[20, 30]}>
            <Col xs={24} lg={12}>
              <div className="business_goal_box">
                <h1>We Help To Achieve Your Business Goal</h1>
                <p>
                  We love what we do and we do it with passion. We value the
                  experimentation of the message and smart incentives.
                </p>
              </div>
            </Col>
            {businessData?.map((v, i: number) => {
              return (
                <Col key={i} xs={24} sm={12} md={8} lg={6}>
                  <BusinessCard key={i} data={v} />
                </Col>
              );
            })}
          </Row>
        </div>
        <div className="customer_review_section">
          <h2>Customers reviews</h2>
          <div className="review_box">
            <div className="review_left">
              <div className="left_top">
                <h2>4,7</h2>
                <Rate value={4.7} disabled />
                <p>1315 reviews</p>
              </div>
              <p>
                A Discount Toner Cartridge Is Better Than Ever And You Will Save
                50 Or More
              </p>
            </div>
            <div className="review_right">
              {reviewData?.map((v, i) => {
                return (
                  <div className="row" key={i}>
                    <p className="gradientText number">{v?.key}</p>
                    <Progress
                      size={["100%", 14]}
                      strokeLinecap="butt"
                      percent={v?.percent}
                      strokeColor={{
                        "13.08%": "#73DDFF",
                        "71.93%": "#3D67D4",
                        "129.56%": "#8908A9",
                      }}
                    />
                    <p className="gradientText points">{v?.points}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <CustomerReview />
      <Footer />
    </div>
  );
};

interface BusinessCardProps {
  data: {
    imageUrl: string;
    name: string;
    position: string;
  };
}
const BusinessCard: React.FC<BusinessCardProps> = ({ data }) => {
  return (
    <div className="business_card">
      <div
        className="image_box"
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
      />
      <div className="detail_box">
        <h2>{data?.name}</h2>
        <p>{data?.position}</p>
      </div>
    </div>
  );
};

export default AboutUs;
