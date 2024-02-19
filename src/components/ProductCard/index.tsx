import React, { useEffect, useState } from "react";
import { Spin, notification } from "antd";

import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import Points from "../Points";

import {
  ColorType,
  ProductType,
  VariationType,
} from "../../store/interfaces/Product";
import { createCart } from "../../store/services/cart";
import { createWishlist, deleteWishlist } from "../../store/services/wishlist";
import { useAppSelector } from "../../store/hooks";
import { isAuthenticated } from "../../utils";

interface Props {
  data: ProductType;
  loading?: boolean;
}

const ProductCard: React.FC<Props> = ({ data }) => {
  const [
    itemCount,
    // setItemCount
  ] = useState(1);
  const [selectedColor, setSelectedColor] = useState<any>();
  const [selectedSize, setSelectedSize] = useState<any>();
  const [localLoading, setLocalLoading] = useState(false);
  const [localWishlistLoading, setLocalWislistLoading] = useState(false);
  const wishlist = useAppSelector((state) => state?.wishlist?.wishlist);
  const user = useAppSelector((state) => state?.auth?.user);

  useEffect(() => {
    setSelectedColor(data?.variations?.[0]?.colors?.[0]);
    setSelectedSize(data?.variations?.[0] || {});
  }, [data]);

  useEffect(() => {
    setSelectedColor(selectedSize?.colors?.[0] || {});
  }, [selectedSize]);

  const navigate = useNavigate();

  const handleAddToCart: React.MouseEventHandler<HTMLDivElement> = async (
    event
  ) => {
    event.stopPropagation();
    
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    else if (selectedColor?.stock > 0 || data?.stock > 0) {
      setLocalLoading(true);
      let payload = {
        product: data?._id,
        quantity: itemCount,
        points: selectedColor?.points,
        color: selectedColor?._id,
        size: selectedSize?._id,
      };
      // console.log('payload inside the product card:', payload);
      const res = await createCart(payload);
      if (res) {
        setLocalLoading(false);
        navigate("/cart");
      }
    } else {
      notification.error({
        message:
          selectedColor?.stock === 0
            ? "selected color is out of stock"
            : "Product is out of stock",
        duration: 3,
      });
    }
  };

  const handleAddToWishlist: React.MouseEventHandler<HTMLDivElement> = async (
    event
  ) => {
    setLocalWislistLoading(true);
    event.stopPropagation();
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    let payload = {
      product: data?._id,
      quantity: itemCount,
      points: selectedColor?.points,
      color: selectedColor?._id,
      size: selectedSize?._id,
    };
    const res = await createWishlist(payload);
    if (res) {
      setLocalWislistLoading(false);
    }
  };

  const handleDeleteWishlistProduct: React.MouseEventHandler<
    HTMLDivElement
  > = async (event) => {
    setLocalWislistLoading(true);

    event.stopPropagation();
    const res = await deleteWishlist(String(wishlist?._id), data?._id);
    if (res) {
      setLocalWislistLoading(false);
    }
  };

  return (
    <div className="product_card_wrapper" style={{ height: "100%" }}>
      {localLoading && (
        <div className="card_loading">
          <Spin />
        </div>
      )}
      <div className="product_card">
        <div
          className="product_image"
          style={{ backgroundImage: `url(${data?.imagesUrl?.[0]})` }}
          onClick={() => navigate(`/product-detail/${data?._id}`)}
        >
          <div
            className="wishlist_box"
            onClick={(e) => {
              if (user?.wishlist?.find((ele) => ele === data?._id)) {
                handleDeleteWishlistProduct(e);
              } else {
                handleAddToWishlist(e);
              }
            }}
          >
            {user?.wishlist?.find((ele) => ele === data?._id) ? (
              localWishlistLoading ? (
                <Spin />
              ) : (
                <FaHeart />
              )
            ) : localWishlistLoading ? (
              <Spin />
            ) : (
              <FaRegHeart />
            )}
          </div>
          <div className="OutOfStock">
            {selectedColor?.stock && selectedColor?.stock < 1 ? (
              <p>Out of Stock</p>
            ) : null}

            {!selectedColor?.stock && data?.stock < 1 ? (
              <p>Out of Stock</p>
            ) : null}
          </div>
          <div
            className="add_to_cart"
            onClick={(e) => {
              // if (selectedColor?.stock && selectedColor?.stock < 1) {
              //   handleAddToCart(e);
              // } else if (data?.stock < 1) {
              //   handleAddToCart(e);
              // }
              handleAddToCart(e)
            }}
          >
            <img src={require("../../assets/images/bag-2.png")} alt="bag" />
            <p>Add to cart</p>
          </div>
        </div>
        <div className="product_detail">
          <p
            onClick={() => navigate(`/product-detail/${data?._id}`)}
            className="product_name"
          >
            {data?.name}
          </p>
          <p
            onClick={() => navigate(`/product-detail/${data?._id}`)}
            className="product_description"
          >
            {data?.description}
          </p>
          <div className="points_box">
            <div className="pb_left">
              <img
                src={require("../../assets/images/amazon-icon.png")}
                alt={"Icon"}
              />
              <p>Amazon</p>
            </div>
            <div className="pb_right">
              <span className="points">
                <Points
                  points={
                    selectedColor?.points ? selectedColor?.points : data?.points
                  }
                />
              </span>
            </div>
          </div>

          <div className="color_and_size_box">
            {selectedSize?.colors?.length > 0 && (
              <div>
                <p>Color</p>
                <div>
                  {selectedSize?.colors?.slice(0, 6)?.map((item: ColorType) => (
                    <div
                      key={item?._id}
                      className="color_div"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        background: item?.hex,
                        border:
                          selectedColor?._id === item?._id
                            ? "2px solid var(--black)"
                            : "none",
                      }}
                      onClick={() => setSelectedColor(item)}
                    />
                  ))}
                </div>
              </div>
            )}
            <div>
              {selectedSize?.size === "Fixed" ||
                ((data?.variations ? data?.variations?.length > 0 : false) && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0px",
                    }}
                  >
                    <p>Size</p>
                    <div style={{ display: "flex", gap: "3px" }}>
                      {data?.variations?.map(
                        (item: VariationType, i: number) => (
                          <p
                            key={item?._id}
                            style={{
                              fontWeight:
                                item?._id === selectedSize?._id ? 800 : 400,
                              cursor: "pointer",
                              color: "var(--black)",
                            }}
                            onClick={() => setSelectedSize(item)}
                          >
                            {item?.size || "-"}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
