import React from "react";
// import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="main_footer_container layoutPaddingInline">
      {/* <div className="subscribe_box">
        <h1>Subscribe to our newsletter</h1>
        <p>To make your stay special and even more memorable</p>
        <div className="input_email_box">
          <Input placeholder="Enter your work email" />
          <Button type="primary" className="primaryButton">
            Subscribe
          </Button>
        </div>
      </div> */}
      {/* <hr className="line" /> */}
      <div className="footer_bottom">
        <div className="left">
          <div className="logo_box">
            <img src={require("../../assets/images/logo.png")} alt="logo" />
          </div>
          <p className="description_text">
            Lorem ipsum dolor sit amet consectetur. Velit ut massa iaculis
            laoreet lectus bibendum nunc. Cursus ut a nunc tristique.
          </p>
          <div>
            <p>1498w Fluton ste, STE</p>
            <p>2D Chicgo, IL 63867.</p>
          </div>
          <p>(123) 456789000</p>
          <p>info@elementum.com </p>
        </div>

        <div className="center">
          <p className="heading_top">Support</p>
          <p className="links" onClick={() => handleNavigate("/about-us")}>
            {" "}
            About Us{" "}
          </p>
          <p className="links" onClick={() => handleNavigate("/contact")}>
            {" "}
            Contact Us{" "}
          </p>
          <p className="heading_top">Terms & Policies</p>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Explore</p>
        </div>

        <div className="right">
          <p className="heading_top">Follow Us</p>
          <p>Instagram</p>
          <p>Linkedin</p>
          <p>Youtube</p>
          <p>Twitter</p>
        </div>
      </div>
      <div className="copyright_box">
        <p>©{new Date().getFullYear()} Elementum. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
