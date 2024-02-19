import React from "react";
import { useNavigate } from "react-router-dom";
import { CategoryType } from "../../store/interfaces/Category";

interface Props {
  data: CategoryType;
}

const getRandomColor = () => {
  const color = "hsl(" + Math.random() * 360 + ", 100%, 85%)";
  return color;
};

export const CategoryCardBig: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="category_card_big" onClick={() => navigate("/products", { state: { categoryId: data?._id } })}>
      <div
        style={{
          backgroundImage: `url(${data?.imageUrl})`,
          backgroundColor: getRandomColor(),
        }}
      />
      <p>{data?.name}</p>
    </div>
  );
};

export const CategoryCardSmall: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      className="category_card_small"
      onClick={() =>
        navigate("/products", { state: { categoryId: data?._id } })
      }
    >
      <div
        style={{
          backgroundImage: `url(${data?.imageUrl})`,
          backgroundColor: getRandomColor(),
        }}
      />
      <p>{data?.name}</p>
    </div>
  );
};

export const CategoryViewAll: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className="category_card_small"
      onClick={() => navigate("/categories")}
    >
      <div
        style={{
          backgroundImage: `url(${require("../../assets/images/home-category.png")})`,
          backgroundSize: "70% 70%",
        }}
      />
      <p>
        <strong>View All</strong>
      </p>
    </div>
  );
};
