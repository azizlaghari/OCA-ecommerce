import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  getCategory,
} from "../../../store/services/categories";
import { useNavigate } from "react-router-dom";

const Category: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const navigate = useNavigate();
  const getRandomColor = () => {
    const color = "hsl(" + Math.random() * 360 + ", 100%, 85%)";
    return color;
  };
  useEffect(() => {
    getAll();
  }, []);
  const getAll = async () => {
    try {
      const data = await getAllCategories();
      filterSubcategories(data);
    } catch (err) {
      console.log({ err });
    }
  };
  const filterSubcategories = async (categories: any[]) => {
    const subcategories = categories.filter(
      (category: { categoryType: string }) =>
        category.categoryType === "subcategory"
    );
    for (const subcategory of subcategories) {
      try {
        const subcategoryData = await getCategory({
          type: subcategory?.categoryType,
        });
        setCategories(subcategoryData);
      } catch (err) {
        console.log({ err });
      }
    }
  };

  return (
    <div
      className={
        window.location.pathname.includes("categories")
          ? "categoryPage"
          : "category_container layoutPaddingInline"
      }
    >
      {categories.map((v, i) => {
        return (
          <div
            key={i}
            className="category_card"
            onClick={() => navigate("/products")}
          >
            <div style={{ backgroundColor: getRandomColor() }} />
            <p>{v?.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
