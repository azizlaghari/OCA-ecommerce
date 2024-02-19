import React, { useEffect, useState } from "react";

import { getAllCategories } from "../../../store/services/categories";
import {
  CategoryCardSmall,
  CategoryViewAll,
} from "../../../components/CategoryCards";
import { useAppSelector } from "../../../store/hooks";

const Category: React.FC = () => {
  const { categories } = useAppSelector((state) => state.category);
  const [windowSize, setWindowSize] = useState<boolean>();

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    await getAllCategories();
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth < 500 ? true : false);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="category_container layoutPaddingInline">
      {categories &&
        categories
          ?.filter((v) => v?.categoryType === "subcategory")
          ?.slice(0, windowSize ? 5 : 10)
          .map((v, i) => {
            return <CategoryCardSmall key={i} data={v} />;
          })}
      {categories?.length > 0 && <CategoryViewAll />}
    </div>
  );
};

export default Category;
