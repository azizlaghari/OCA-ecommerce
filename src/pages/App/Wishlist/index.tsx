import React, { useEffect, useState } from "react";
import { Col, Row, Spin } from "antd";

import Header from "../../../components/Header";
import Banner from "../../../components/Banner";
import Footer from "../../../components/Footer";
import ProductCard from "../../../components/ProductCard";

import emptyCartIMG from "../../../assets/images/emptyCartIMG.png";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getWishlist } from "../../../store/services/wishlist";
import { getRecommendationProducts } from "../../../store/services/product";
import { ProductType } from "../../../store/interfaces/Product";
import { setGlobalSearch } from "../../../store/slices/productSlice";
import { CartProductType } from "../../../store/interfaces/Cart";

interface RecommendProducts {
  products: Array<ProductType>;
}

const Wishlist: React.FC = () => {
  const { wishlist } = useAppSelector((state) => state?.wishlist);
  const { search } = useAppSelector((state) => state.products);
  const [recommendProducts, setrecommendProducts] = useState<RecommendProducts>(
    { products: [] }
  );
  const [productSlice, setProductSlice] = useState<number>(4);
  const [wishlistSlice, setWislishSlice] = useState<number>(4);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getData();
    bestRecommend();
    return () => {
      dispatch(setGlobalSearch(""));
    };
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    setLoading(true);
    await getWishlist();
    setLoading(false);
  };

  const bestRecommend = async () => {
    setLoading(true);
    const data = await getRecommendationProducts();
    setrecommendProducts(data);
    setLoading(false);
  };

  const handleLoadMore = () => setProductSlice((pre) => pre + 4);
  const handleLoadMoreWishlist = () => setWislishSlice((pre) => pre + 4);

  return (
    <div className="Wishlist">
      <Header />
      <div className="layoutPaddingInline">
        <Banner location={"wishlist"} />
      </div>
      {loading ? (
        <div className="empty_cart">
          <Spin />
        </div>
      ) : wishlist?.products?.length ? (
        <>
          <div
            className="layoutPaddingInline customPadding"
          >
            <Row gutter={[20, 20]}>
              {wishlist?.products
                ?.slice(0, wishlistSlice)
                ?.filter((v: { product: { name: string } }) =>
                  v?.product?.name
                    .toLowerCase()
                    .includes(search.toLowerCase().trim())
                )
                ?.map((v: CartProductType, i: number) => {
                  return (
                    <Col key={i} xs={24} sm={12} md={8} lg={8} xl={6} xxl={6}>
                      <ProductCard data={v?.product} />
                    </Col>
                  );
                })}
            </Row>
          </div>
          {wishlistSlice < wishlist?.products?.length && (
            <button
            style={{marginBottom: '0px'}}
              onClick={handleLoadMoreWishlist}
              className="primaryButton customButton"
            >
              Load more
            </button>
          )}
        </>
      ) : (
        <div className="emptyCart">
          <img width={"40%"} src={emptyCartIMG} alt="emptyCart" />
          <p className="emptyCartText">
            There are no favorites yet. <br />
            Add your favorites to wishlist and they will show here.
          </p>
        </div>
      )}
      {loading ? (
        <div className="empty_cart">
          <Spin />
        </div>
      ) : recommendProducts?.products?.length ? (
        <>
          <div
            className="layoutPaddingInline"
            style={{ paddingBlock: "80px", width: "100%" }}
          >
            <div className="emptyCardHeading">just for you 💝</div>
            <Row gutter={[20, 20]}>
              {recommendProducts &&
                recommendProducts?.products
                  ?.slice(0, productSlice)
                  ?.map((v: ProductType, i: number) => {
                    return (
                      <Col key={i} xs={24} sm={12} lg={8} xl={6} xxl={6}>
                        <ProductCard data={v} />
                      </Col>
                    );
                  })}
            </Row>
          </div>
          {productSlice < recommendProducts?.products?.length && (
            <button
              
              onClick={handleLoadMore}
              className="primaryButton customButton"
              style={{ marginBottom: "50px" }}
            >
              Load more
            </button>
          )}
        </>
      ) : (
        <div className="empty_cart">
          <p>Products are not Avaliable</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Wishlist;
