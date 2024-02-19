import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Row, Spin } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "../../../components/Header";
import CustomerReview from "../../../components/CustomerReview";
import Footer from "../../../components/Footer";
import OrderSummary from "../../../components/OrderSummary";
import ProductCard from "../../../components/ProductCard";
import CartCard from "../../../components/CartCard";
import ProductHeader from "../Home/ProductSection/ProductHeader";

import { useAppSelector } from "../../../store/hooks";
import { getCart } from "../../../store/services/cart";
import { setCart } from "../../../store/slices/cartSlice";
import {
  CategoryWiseProductsType,
  ProductType,
} from "../../../store/interfaces/Product";

import { getDeliveryFee, getPoints } from "../../../utils";
import { getProduct } from "../../../store/services/product";
import { getSettings } from "../../../store/services/settings";
import emptyCartIMG from "../../../assets/images/emptyCartIMG.png";


const Cart: React.FC = () => {
  const categories = useAppSelector((state) => state?.products?.categories);
  const { cart } = useAppSelector((state) => state?.cart);
  const [loading, setLoading] = useState<boolean>(true);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  // const [size, setSize] = useState<number>(0); // State for window size
  const [specialCategories, setSpecialCategories] =
    useState<CategoryWiseProductsType>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart?.length > 0) {
      let value = getPoints(cart?.[0]?.products);
      let delivery = getDeliveryFee(cart?.[0]?.products);
      setTotal(Number(value));
      setDeliveryFee(delivery);
    }
  }, [cart]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
    // function updateSize() {
    //   setSize(Number(window.innerWidth));
    // }
    // window.addEventListener("resize", updateSize);
    // updateSize();
    return () => {
      // window.removeEventListener("resize", updateSize);
      dispatch(setCart([]));
      setDeliveryFee(0);
      setTotal(0);
    };
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    setLoading(true);
    await Promise.all([getSettings(), getCart(), getProduct()]);
    setLoading(false);
  };

  const onCheckout = () => {
    if (cart?.length > 0) {
      navigate("/checkout");
    }
  };

  useEffect(() => {
    let tempcSpecial = categories?.filter(
      (item: { category: string }) => item?.category === "Special Programs"
    );
    setSpecialCategories(tempcSpecial[0]);
  }, [categories]);

  return (
    <div className="cart">
      <Header />
      <div className="layoutPaddingInline">
        <div className="breadcrumb">
          <Breadcrumb
            items={[
              {
                title: <Link to="/">Home</Link>,
              },
              {
                title: (
                  <Link to="/cart">
                    <p className="cartBreadcrumb">Cart</p>
                  </Link>
                ),
              },
            ]}
          />
        </div>
        <Row gutter={[20, 20]}>
          <Col
            xl={18}
            lg={18}
            md={24}
            sm={24}
            xs={24}
            // order={size > 991 ? 1 : 2}
          >
            <div className="cardBorder">
              {loading ? (
                <div className="empty_cart">
                  <Spin />
                </div>
              ) : cart?.[0]?.products?.length > 0 ? (
                cart?.[0]?.products?.map((v, i: number, arr) => {
                  const isLast = i === arr.length - 1;
                  return (
                    <CartCard
                      divider={!isLast ? true : false}
                      key={i}
                      data={v}
                    />
                  );
                })
              ) : (
                <div className="emptyCart">
                  <img src={emptyCartIMG} alt="emptyCart" />
                  <p className="emptyCartText">Your cart is empty</p>
                </div>
              )}
            </div>
          </Col>
          <Col
            xl={6}
            lg={6}
            md={24}
            sm={24}
            xs={24}
            // order={size > 991 ? 2 : 1}
          >
            <div className="cardBorder">
              <OrderSummary
                cart
                goTo={onCheckout}
                subTotal={total}
                deliveryCharges={total && deliveryFee}
                total={total && total + deliveryFee}
              />
            </div>
          </Col>
        </Row>

        <div style={{ paddingBlock: "30px" }}>
          <ProductHeader
            title={specialCategories?.category}
            description={specialCategories?.description}
          />
          <Row gutter={[20, 20]}>
            {specialCategories?.products
              ?.slice(0, 8)
              .map((v: ProductType, i: number) => {
                return (
                  <Col key={i} xs={24} sm={12} lg={8} xl={6} xxl={6}>
                    <ProductCard data={v} />
                  </Col>
                );
              })}
          </Row>
        </div>
      </div>
      <CustomerReview />
      <Footer />
    </div>
  );
};

export default Cart;
