import React, { useEffect, useState } from "react";
import { Col, Row, Spin, Carousel } from "antd";

import ProductCard from "../../../../components/ProductCard";

import ProductHeader from "./ProductHeader";
import Advertisement from "./Advertisement";
import { useAppSelector } from "../../../../store/hooks";
import {
  CategoryWiseProductsType,
  ProductType,
} from "../../../../store/interfaces/Product";
import {
  getProduct,
  getRecommendationProducts,
  getWeeklySellingProducts,
} from "../../../../store/services/product";

import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const emptyData = {
  category: "",
  products: [],
  description: "",
};

const ProductSection: React.FC = () => {
  const categories = useAppSelector((state) => state?.products?.categories);
  const [celebrationsCategories, setCelebrationsCategories] =
    useState<CategoryWiseProductsType>(emptyData);
  const [experiencesCategories, setExperiencesCategories] =
    useState<CategoryWiseProductsType>(emptyData);
  const [specialCategories, setSpecialCategories] =
    useState<CategoryWiseProductsType>(emptyData);
  const [weeklyProducts, setWeeklyProducts] =
    useState<CategoryWiseProductsType>(emptyData);
  const [recommendProducts, setrecommendProducts] =
    useState<CategoryWiseProductsType>(emptyData);

  const [experienceCatSlides, setExperienceCatSlides] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [weeklyProductLoading, setWeeklyProductLoading] =
    useState<boolean>(true);
  const [recommendLoading, setrecommendLoading] = useState<boolean>(true);

  useEffect(() => {
    getProducts();
    weeklySelling();
    bestRecommend();
    // eslint-disable-next-line
  }, []);

  const [size, setSize] = useState<number>(0);
  const [sliceState, setSliceState] = useState<number>(4);

  useEffect(() => {
    function updateSize() {
      setSize(window.outerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    let tempcSpecial = categories.filter(
      (item: { category: string }) => item?.category === "Special Programs"
    );
    setSpecialCategories(tempcSpecial[0]);

    let tempCelebrations = categories.filter(
      (item: { category: string }) => item?.category === "Celebrations"
    );
    setCelebrationsCategories(tempCelebrations[0]);

    let tempExperiences = categories.filter(
      (item: { category: string }) => item?.category === "Experiences"
    );
    setExperiencesCategories(tempExperiences[0]);
  }, [categories]);

  useEffect(() => {
    let expCat = Math.ceil(experiencesCategories?.products?.length / 4);
    let tempArr = [];
    for (let i = 1; i <= expCat; i++) {
      tempArr.push(i);
    }
    setExperienceCatSlides(tempArr);
  }, [experiencesCategories]);

  useEffect(() => {
    if (size > 1100) {
      setSliceState(4);
    } else if (size < 1100 && size >= 990) {
      let expCat = Math.ceil(experiencesCategories?.products?.length / 3);
      let tempArr = [];
      for (let i = 1; i <= expCat; i++) {
        tempArr.push(i);
      }
      setExperienceCatSlides(tempArr);
      setSliceState(3);
    } else if (size < 990 && size >= 600) {
      let expCat = Math.ceil(experiencesCategories?.products?.length / 2);
      let tempArr = [];
      for (let i = 1; i <= expCat; i++) {
        tempArr.push(i);
      }
      setExperienceCatSlides(tempArr);
      setSliceState(2);
    } else if (size < 600) {
      let expCat = Math.ceil(experiencesCategories?.products?.length / 1);
      let tempArr = [];
      for (let i = 1; i <= expCat; i++) {
        tempArr.push(i);
      }
      setExperienceCatSlides(tempArr);
      setSliceState(1);
    }
    // eslint-disable-next-line
  }, [size]);

  const getProducts = async () => {
    !loading && setLoading(true);
    await getProduct();
    setLoading(false);
  };
  const weeklySelling = async () => {
    setWeeklyProductLoading(true);
    const data = await getWeeklySellingProducts();
    setWeeklyProducts(data);
    setWeeklyProductLoading(false);
  };
  const bestRecommend = async () => {
    setrecommendLoading(true);
    const data = await getRecommendationProducts();
    setrecommendProducts(data);
    setrecommendLoading(false);
  };

  return (
    <div className="product_section_container layoutPaddingInline PaddingRemoveSS">
      <div>
        {loading ? (
          <div className="empty_cart">
            <Spin />
          </div>
        ) : (
          <div style={{ paddingBlock: "30px" }}>
            <ProductHeader
              title={specialCategories?.category}
              description={specialCategories?.description}
            />
            {specialCategories?.products?.length === 0 ? (
              <div className="empty_cart">
                <p>Products are not Avaliable</p>
              </div>
            ) : (
              <div>
                <Carousel
                  className="CUSTOM_BTN"
                  dots={false}
                  arrows={true}
                  prevArrow={<GoChevronLeft color="#1E6CB6" />}
                  nextArrow={<GoChevronRight color="#1E6CB6" />}
                >
                  {experienceCatSlides?.map((v, i: number) => (
                    <div key={i}>
                      <Row className="carousel-div" gutter={[20, 20]}>
                        {specialCategories?.products
                          ?.slice(i * sliceState, i * sliceState + sliceState)
                          .map((v: ProductType, i: number) => {
                            return (
                              <Col
                                key={v?._id}
                                xs={24}
                                sm={12}
                                lg={8}
                                xl={6}
                                xxl={6}
                              >
                                <ProductCard data={v} />
                              </Col>
                            );
                          })}
                      </Row>
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        )}
      </div>
      {/* -------------------------------------- */}
      <div>
        {loading ? (
          <div className="empty_cart">
            <Spin />
          </div>
        ) : (
          <div style={{ paddingBlock: "30px" }}>
            <ProductHeader
              title={celebrationsCategories?.category}
              description={celebrationsCategories?.description}
            />
            {celebrationsCategories?.products?.length === 0 ? (
              <div className="empty_cart">
                <p>Products are not Avaliable</p>
              </div>
            ) : (
              <div>
                <Carousel
                  className="CUSTOM_BTN"
                  dots={false}
                  arrows={true}
                  prevArrow={<GoChevronLeft color="#1E6CB6" />}
                  nextArrow={<GoChevronRight color="#1E6CB6" />}
                >
                  {experienceCatSlides?.map((v, i: number) => (
                    <div key={i}>
                      <Row className="carousel-div" gutter={[20, 20]}>
                        {celebrationsCategories?.products
                          ?.slice(i * sliceState, i * sliceState + sliceState)
                          .map((v: ProductType, i: number) => {
                            return (
                              <Col
                                key={v?._id}
                                xs={24}
                                sm={12}
                                lg={8}
                                xl={6}
                                xxl={6}
                              >
                                <ProductCard data={v} />
                              </Col>
                            );
                          })}
                      </Row>
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        )}
      </div>
      {/* -------------------------------------- */}
      {/* <Carousel> */}
      <div>
        {loading ? (
          <div className="empty_cart">
            <Spin />
          </div>
        ) : (
          <div style={{ paddingBlock: "30px" }}>
            <ProductHeader
              title={experiencesCategories?.category}
              description={experiencesCategories?.description}
            />
            {experiencesCategories?.products?.length === 0 ? (
              <div className="empty_cart">
                <p>Products are not Avaliable</p>
              </div>
            ) : (
              <div>
                <Carousel
                  className="CUSTOM_BTN"
                  dots={false}
                  arrows={true}
                  prevArrow={<GoChevronLeft color="#1E6CB6" />}
                  nextArrow={<GoChevronRight color="#1E6CB6" />}
                >
                  {experienceCatSlides?.map((v, i: number) => (
                    <div key={i}>
                      <Row className="carousel-div" gutter={[20, 20]}>
                        {experiencesCategories?.products
                          ?.slice(i * sliceState, i * sliceState + sliceState)
                          .map((v: ProductType, i: number) => {
                            return (
                              <Col
                                key={v?._id + i}
                                xs={24}
                                sm={12}
                                lg={8}
                                xl={6}
                                xxl={6}
                              >
                                <ProductCard data={v} />
                              </Col>
                            );
                          })}
                      </Row>
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        )}
      </div>
      {/* </Carousel> */}
      {/* -------------------------------------- */}
      <div>
        {recommendLoading ? (
          <div className="empty_cart">
            <Spin />
          </div>
        ) : (
          <div style={{ paddingBlock: "30px" }}>
            <ProductHeader title={"Best Gifts Recommendation"} />
            {recommendProducts?.products?.length === 0 ? (
              <div className="empty_cart">
                <p>Products are not Avaliable</p>
              </div>
            ) : (
              <div>
                <Carousel
                  className="CUSTOM_BTN"
                  dots={false}
                  arrows={true}
                  prevArrow={<GoChevronLeft color="#1E6CB6" />}
                  nextArrow={<GoChevronRight color="#1E6CB6" />}
                >
                  {experienceCatSlides?.map((v, i: number) => (
                    <div key={i}>
                      <Row className="carousel-div" gutter={[20, 20]}>
                        {recommendProducts?.products
                          ?.slice(i * sliceState, i * sliceState + sliceState)
                          .map((v: ProductType, i: number) => {
                            return (
                              <Col
                                key={v?._id + i}
                                xs={24}
                                sm={12}
                                lg={8}
                                xl={6}
                                xxl={6}
                              >
                                <ProductCard data={v} />
                              </Col>
                            );
                          })}
                      </Row>
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        )}
      </div>
      {/* -------------------------------------- */}
      <Advertisement />
      {/* -------------------------------------- */}
      <div>
        {weeklyProductLoading ? (
          <div className="empty_cart">
            <Spin />
          </div>
        ) : (
          <div style={{ paddingBlock: "30px" }}>
            <ProductHeader
              title={"Weekly Best Selling Gifts💖"}
              // description="Nunc egestas condimentum condimentum. Phasellus accumsan, sapien in commodo maximus, diam neque luctus enim,"
            />
            {weeklyProducts?.products?.length === 0 ? (
              <div className="empty_cart">
                <p>Products are not Avaliable</p>
              </div>
            ) : (
              <div>
                <Carousel
                  className="CUSTOM_BTN"
                  dots={false}
                  arrows={true}
                  prevArrow={<GoChevronLeft color="#1E6CB6" />}
                  nextArrow={<GoChevronRight color="#1E6CB6" />}
                >
                  {experienceCatSlides?.map((v, i: number) => (
                    <div key={i}>
                      <Row className="carousel-div" gutter={[20, 20]}>
                        {weeklyProducts?.products
                          ?.slice(i * sliceState, i * sliceState + sliceState)
                          .map((v: ProductType, i: number) => {
                            return (
                              <Col
                                key={v?._id + i}
                                xs={24}
                                sm={12}
                                lg={8}
                                xl={6}
                                xxl={6}
                              >
                                <ProductCard data={v} />
                              </Col>
                            );
                          })}
                      </Row>
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        )}
      </div>
      {/* -------------------------------------- */}
      <div style={{ marginTop: "50px" }} />
    </div>
  );
};

export default ProductSection;
