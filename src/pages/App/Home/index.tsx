import React, { useEffect } from "react";

import HeroSection from "./HeroSection";
import Category from "./Category";
import ProductSection from "./ProductSection";
import CustomerReview from "../../../components/CustomerReview";
import Footer from "../../../components/Footer";

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home_container">
      <HeroSection />
      <Category />
      <ProductSection />
      <CustomerReview />
      <Footer />
    </div>
  );
};

export default Home;
