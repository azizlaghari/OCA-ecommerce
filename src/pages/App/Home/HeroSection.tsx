import React from "react";
import Header from "../../../components/Header";

const HeroSection: React.FC = () => {
  return (
    <div className="hero_section_container">
      <Header />
      <div className="content">
        <h1>Aenean bibendum fermentum lacinia. Donec mollis,</h1>
        <p>
          Nunc egestas condimentum condimentum. Phasellus accumsan, sapien in
          commodo maximus, diam neque luctus enim, eget tristique dui massa ac
          orci. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
