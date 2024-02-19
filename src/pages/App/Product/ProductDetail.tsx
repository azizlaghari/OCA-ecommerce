import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";

import { useParams } from "react-router-dom";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CustomerReview from "../../../components/CustomerReview";
import ProductCard from "../../../components/ProductCard";
import ProductHeader from "../Home/ProductSection/ProductHeader";
import ProductDetails from "../../../components/Product";

import { useAppSelector } from "../../../store/hooks";
import { getProduct, getSingleProduct } from "../../../store/services/product";
import {
  CategoryWiseProductsType,
  ProductType,
} from "../../../store/interfaces/Product";
import Loader from "../../../components/Loader";

const ProductDetail: React.FC = () => {
  const { singleProduct, loading } = useAppSelector((state) => state?.products);
  const categories = useAppSelector((state) => state?.products?.categories);
  const [specialCategories, setSpecialCategories] =
    useState<CategoryWiseProductsType>({ category: "", products: [] });
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    getSingleProduct(id || "");
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
  }, []);

  const getProducts = async () => {
    await getProduct();
  };

  useEffect(() => {
    let tempcSpecial = categories.filter(
      (item: { category: string }) => item?.category === "Special Programs"
    );
    setSpecialCategories(tempcSpecial[0]);
    // eslint-disable-next-line
  }, [categories]);

  return (
    <div className="productDetail">
      <Header />
      <div className="90%" style={{ width: "90%" }}>
        {loading ? (
          <Loader spin />
        ) : (
          <ProductDetails data={singleProduct} loading={loading} />
        )}

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

export default ProductDetail;
