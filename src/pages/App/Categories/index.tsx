import React, { useState, useEffect } from "react";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Banner from "../../../components/Banner";
import Loader from "../../../components/Loader";
import { CategoryCardBig } from "../../../components/CategoryCards";

import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { CategoryType } from "../../../store/interfaces/Category";
import { setGlobalSearch } from "../../../store/slices/productSlice";

import emptyCartIMG from "../../../assets/images/emptyCartIMG.png";

const Categories: React.FC = () => {
  //  Get Categories api call in banner component
  const { loading, categories, categoryFilter } = useAppSelector(
    (state) => state.category
  );
  const { search } = useAppSelector((state) => state.products);
  const [categorySlice, setCategorySlice] = useState<number>(8);
  const [filterCategories, setFilterCategories] = useState<Array<CategoryType>>(
    []
  );
  const [filterdData, setFilterdData] = useState<Array<CategoryType>>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setFilterCategories(filter());
    // eslint-disable-next-line
  }, [categories, categoryFilter, search]);

  useEffect(() => {
    const data = filterCategories?.filter((v) =>
      v?.name.toLowerCase().includes(search.toLowerCase().trim())
    );
    setFilterdData(data);
  }, [filterCategories, search]);

  useEffect(() => {
    setCategorySlice(8);
  }, [categoryFilter]);

  useEffect(() => {
    return () => {
      dispatch(setGlobalSearch(""));
    };
    // eslint-disable-next-line
  }, []);

  const filter = () => {
    if (!categories) {
      return [];
    }
    if (categoryFilter === "All") {
      return categories.filter(
        (v: CategoryType) => v?.categoryType === "subcategory"
      );
    } else {
      return categories.filter((v: CategoryType) => {
        if (v?.categoryId && Array.isArray(v.categoryId)) {
          return v?.categoryId.some(
            (x: CategoryType) => x?._id === categoryFilter
          );
        }
        return false;
      });
    }
  };

  const handleLoadMore = () => setCategorySlice((pre) => pre + 8);

  return (
    <div className="Categories">
      <Header />
      <div className="layoutPaddingInline">
        <Banner location={"categories"} />
      </div>
      {loading ? (
        <Loader spin />
      ) : filterdData?.length > 0 ? (
        <>
          <div className="categoriesContent layoutPaddingInline">
            {filterdData?.slice(0, categorySlice)?.map((v, i) => {
              return <CategoryCardBig key={i} data={v} />;
            })}
          </div>
          {categorySlice < filterdData?.length && (
            <button
              onClick={handleLoadMore}
              className="primaryButton customButton"
            >
              Load more
            </button>
          )}
        </>
      ) : (
        <div className="emptyCart">
          <img src={emptyCartIMG} alt="emptyCart" />
          <p className="emptyCartText">No category found</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Categories;
