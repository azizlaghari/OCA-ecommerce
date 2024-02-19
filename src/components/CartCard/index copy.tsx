import React, { useEffect, useRef, useState } from "react";
import {
  ColorType,
  // ProductType,
  // VariationType,
} from "../../store/interfaces/Product";
import deleteICON from "../../assets/images/deleteICON.svg";
import { Divider, InputNumber, Spin } from "antd";
import minus from "../../assets/images/minus.svg";
import plus from "../../assets/images/plus.svg";
import Points from "../Points";
import { deleteCart, updateCart } from "../../store/services/cart";
import { useAppSelector } from "../../store/hooks";
import { CartProductType } from "../../store/interfaces/Cart";

interface CartCardProps {
  data: CartProductType;
  divider?: boolean;
  loading?: boolean;
}

interface SelectedSize {
  _id: string;
  size: string;
  colors: ColorType[];
}

const CartCard: React.FC<CartCardProps> = ({ data, divider }) => {
  const { product, color, size, quantity } = data;
  const cart = useAppSelector((state) => state?.cart?.cart?.[0]);
  const [itemSize, setItemSize] = useState<SelectedSize>();
  const [itemColor, setItemColor] = useState<ColorType>();
  const [itemCount, setItemCount] = useState(quantity || 1);
  const [selectedColor, setSelectedColor] = useState<ColorType | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<string>("");

  const handleIncrease = () => {
    setItemCount(itemCount + 1);
  };

  const handleDecrease = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  useEffect(() => {
    let filteredSize = product?.variations?.filter(
      (item) => item?._id === size?.toString()
    );
    setItemSize(filteredSize?.[0]);
    let filteredColor = filteredSize?.[0]?.colors?.filter(
      (item) => item?._id === color
    );
    setItemColor(filteredColor?.[0]);
    setSelectedColor(filteredColor?.[0]);
    // eslint-disable-next-line
  }, [data]);

  const handleDelete = async () => {
    setLoading(String(data?._id));
    await deleteCart(cart?._id, data?._id);
    setLoading("");
  };

  const handleUpdate = async () => {
    await updateCart({
      _id: cart?._id,
      productId: data?._id,
      quantity: itemCount,
      points: selectedColor?.points,
      size: itemSize?.size,
      color: itemColor?.hex,
    });
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    handleUpdate();
    // eslint-disable-next-line
  }, [itemCount]);

  return (
    <div className="cartCard">
      <div className="cartContainer">
        <div className="productContent">
          {/* <div className="largeScreen">
            {loading === data?._id ? (
              <Spin />
            ) : (
              <img
                src={deleteICON}
                onClick={handleDelete}
                className="mobileDeleteBTN"
                alt="delete-icon"
              />
            )}
          </div> */}

          <div
            className="productImage"
            style={{ backgroundImage: `url(${product?.imagesUrl?.[0]})` }}
          />

          {/* <img
            className="productIMG"
            width={"10%"}
            src={product?.imagesUrl?.[0]}
            alt="image1"
          /> */}
          {/* for mobile screen */}
          {/* <div className="forMobileScreen">
            {loading === data?._id ? (
              <Spin />
            ) : (
              <img
                src={deleteICON}
                onClick={handleDelete}
                className="mobileDeleteBTN"
                alt="delete-icon"
              />
            )}

            <img
              // className="productIMG"
              width={"30%"}
              src={product?.imagesUrl?.[0]}
              alt="image1"
            />
          </div> */}

          <div className="productDescription">
            <p>
              {product?.name?.length > 30
                ? `${product?.name?.slice(0, 30)}...`
                : product?.name}
            </p>
            {
              <>
                <div className="labelName">
                  {itemSize?.size === "Fixed" ||
                    ((data?.product?.variations
                      ? data?.product?.variations?.length > 0
                      : false) && (
                      <>
                        <label>Size:</label>
                        <p>{itemSize?.size}</p>
                      </>
                    ))}
                </div>
              </>
            }
            {itemColor && (
              <>
                <div className="labelName">
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      gap: ".3rem",
                    }}
                  >
                    <label>Color:</label>
                    <p
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: itemColor?.hex,
                      }}
                    />
                  </div>
                </div>
              </>
            )}
            <div className="points">
              <Points
                points={
                  selectedColor?.points
                    ? selectedColor?.points
                    : data?.product?.points
                }
              />
            </div>
          </div>
        </div>
        <div className="del-item-count">
          {loading === data?._id ? (
            <Spin className="deleteBTN" />
          ) : (
            <img
              src={deleteICON}
              onClick={handleDelete}
              alt="delete-icon"
              className="deleteBTN"
            />
          )}
          <div className="plus-minus">
            <img src={minus} alt="minus" onClick={handleDecrease}></img>
            <InputNumber
              type="number"
              className="ITEM_COUNT"
              value={itemCount}
              min={1}
              onChange={(e) => {
                const newValue = Number(e);
                if (newValue > 0) {
                  setItemCount(newValue);
                }
              }}
            />
            <img src={plus} alt="plus" onClick={handleIncrease}></img>
          </div>
        </div>
      </div>
      {divider && <Divider />}
    </div>
  );
};

export default CartCard;
