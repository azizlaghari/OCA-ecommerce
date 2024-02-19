import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import AuthWrapper from "./AuthRoutes";
import PrivateWrapper from "./PrivateRoutes";
import PublicWrapper from "./PublicRoutes";

import {
  CodeVerification,
  EmailVerification,
  Login,
  PasswordChange,
  PasswordVerification,
  Signup,
} from "../pages/Auth";
import {
  AboutUs,
  Cart,
  Categories,
  Checkout,
  ContactUs,
  Home,
  Product,
  ProductDetail,
  Rewards,
  Settings,
  Wishlist,
  OrderSummaryPage,
} from "../pages/App";

const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<Home />} />
        </Route>
        {/* Private */}
        <Route element={<PrivateWrapper />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Product />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/order-summary" element={<OrderSummaryPage />} />
        </Route>
        {/* Auth */}
        <Route element={<AuthWrapper />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/password-verification"
            element={<PasswordVerification />}
          />
          <Route path="/password-change" element={<PasswordChange />} />
          <Route path="/code-verification" element={<CodeVerification />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="*" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
