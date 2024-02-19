import React, { useEffect, useState } from "react";
import { Col, Row, Spin, Pagination } from "antd";

import Header from "../../../components/Header";
import Banner from "../../../components/Banner";
import Footer from "../../../components/Footer";
import ProductCard from "../../../components/ProductCard";

import { useLocation } from "react-router-dom";
import { filterProducts } from "../../../store/services/product";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setGlobalSearch } from "../../../store/slices/productSlice";

import { ProductType } from "../../../store/interfaces/Product";
import emptyCartIMG from "../../../assets/images/emptyCartIMG.png";

const Product: React.FC = () => {
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const { search } = useAppSelector((state) => state.products);
  const [data, setData] = useState<Array<ProductType>>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchproducts, setSearch] = useState("");
  const [minRange, setMinRange] = useState<number | null>(0);
  const [maxRange, setMaxRange] = useState<number | null>(0);
  // const [selectedAllCategories, setSelectedAllCategories] =
  //   useState<string[]>([]);
  const [selectedAllCategories, setSelectedAllCategories] = useState<string[]>(
    categoryId ? [categoryId] : []
  );
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [filterdData, setFilterdData] = useState<Array<ProductType>>([]);
  const [filterTotal, setFilterTotal] = useState<number>(0);

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (categoryId) {
  //     setSelectedAllCategories([categoryId]);
  //   }
  // }, [categoryId]);

  useEffect(() => {
    searchfilterProdcuts();
    return () => {
      dispatch(setGlobalSearch(""));
    };
  }, []);

  const handleShowResults: any = async (payload: any) => {
    setCurrentPage(1);
    searchfilterProdcuts(payload);
  };

  const searchfilterProdcuts = async (payload = undefined) => {
    window.scrollTo(0, 0);
    setLoading(true);
    const selectedCategories =
      selectedAllCategories && selectedAllCategories?.length >= 1
        ? [...selectedAllCategories]
        : [];

    const customPayload = payload
      ? payload
      : {
          search: searchproducts,
          // subCategories: selectedCategories,
          subCategories: selectedCategories,
          pointsRange: {
            min: minRange,
            max: maxRange,
          },
          page: currentPage,
          perPage: perPage,
        };

    try {
      const data = await filterProducts(customPayload);
      setData(data?.products);
      setTotal(data?.total);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchfilterProdcuts();
  }, [currentPage]);

  useEffect(() => {
    const filtered = data?.filter((v: { name: string }) =>
      v?.name.toLowerCase().includes(search.trim())
    );
    setFilterdData(filtered);
    setFilterTotal(filtered?.length);
  }, [data, search]);

  return (
    <div className="Product">
      <Header />
      <div className="layoutPaddingInline">
        <Banner
          location={"products"}
          search={searchproducts}
          setSearch={setSearch}
          setMinRange={setMinRange}
          setMaxRange={setMaxRange}
          categoryId={categoryId}
          setSelectedAllCategories={setSelectedAllCategories}
          handleShowResults={handleShowResults}
        />
      </div>

      {loading ? (
        <div className="NoHistory" style={{ height: "50vh" }}>
          <Spin size="large" style={{ paddingTop: "40px" }} />
        </div>
      ) : filterdData?.length > 0 ? (
        <>
          <div
            className="layoutPaddingInline customPadding"
            // style={{ paddingBlock: "80px", width: "100%" }}
          >
            <Row gutter={[20, 20]}>
              {filterdData?.length > 0 ? (
                filterdData?.map((v: ProductType, i: number) => (
                  <Col key={i} xs={24} sm={12} md={8} lg={8} xl={6} xxl={6}>
                    <ProductCard data={v} />
                  </Col>
                ))
              ) : (
                <div className="emptyProduct" style={{ width: "100%" }}>
                  <img width={"150px"} src={emptyCartIMG} alt="emptyCart" />
                  <p className="emptyProductText">No product found.</p>
                </div>
              )}
            </Row>
          </div>
          <div className="product_pagination_box">
            <Pagination
              current={currentPage}
              total={search !== "" ? filterTotal : total}
              pageSize={perPage}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        </>
      ) : (
        <div className="emptyProduct">
          <img width={"40%"} src={emptyCartIMG} alt="emptyCart" />
          <p className="emptyProductText">No product found.</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Product;
