import React from "react";
import { useNavigate } from "react-router-dom";

interface ProductHeaderType {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}
const ProductHeader: React.FC<ProductHeaderType> = ({
  title,
  description,
  children,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="product_header">
        <div className="ph_left">
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <div
          className="ph_right"
          onClick={() => navigate("/products", { state: { categoryId: null } })}
        >
          <p className="gradientText">View All</p>
          {/* <div className="arrow_left">
            <GoChevronLeft />
          </div>
          <div className="arrow_right">
            <GoChevronRight />
          </div> */}
        </div>
      </div>
      {children && children}
    </>
  );
};

export default ProductHeader;
