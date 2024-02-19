import { Breadcrumb, Col, Row, Spin, InputNumber, notification, Tooltip } from "antd";
import backICON from "../../assets/images/back.svg";
import heartICON from "../../assets/images/heart.svg";
import minus from "../../assets/images/minus.svg";
import plus from "../../assets/images/plus.svg";
// import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import Points from "../Points";
import amazonLogo from "../../assets/images/amazon.png";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useEffect, useState } from "react";
import { createCart } from "../../store/services/cart";
import { useNavigate } from "react-router-dom";
import { createWishlist, deleteWishlist } from "../../store/services/wishlist";
import { useAppSelector } from "../../store/hooks";
import { isAuthenticated } from "../../utils";


const ProductDetails = ({ data, loading }) => {
  const { wishlist } = useAppSelector((state) => state?.wishlist);
  const user = useAppSelector((state) => state?.auth?.user);
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [wishliashloading, setLoading] = useState();
  const [itemCount, setItemCount] = useState(1);
  const [windowSize, setWindowSize] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth < 500 ? true : false);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // Prepare the array of image objects for the ImageGallery component
  const imageGalleryItems = data?.imagesUrl?.map((item, index) => ({
    original: item,
    thumbnail: item,
    thumbnailHeight: 80,
    originalHeight: windowSize ? 250 : 550,
    originalClass: "image-gallery-original",
    thumbnailClass: "image-gallery",
  }));

  useEffect(() => {
    setSelectedColor(data?.variations?.[0]?.colors?.[0] || {});
    setSelectedSize(data?.variations?.[0] || {});
  }, [data]);

  useEffect(() => {
    setSelectedColor(selectedSize?.colors?.[0] || {});
  }, [selectedSize]);

  const handleIncrease = () => {
    setItemCount(itemCount + 1);
  };

  const handleDecrease = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  // const addCartHandler = () => {
  //   if (selectedColor?.stock > 0 || data?.stock > 0) {
  //     let payload = {
  //       product: data?._id,
  //       quantity: itemCount,
  //       points: selectedColor?.points,
  //       color: selectedColor?._id,
  //       size: selectedSize?._id,
  //     };
  //     const res = createCart(payload);
  //     if (res) {
  //       navigate("/cart");
  //     }
  //   } else {
  //     notification.error({
  //       message:
  //         selectedColor?.stock === 0
  //           ? "selected color is out of stock"
  //           : "Product is out of stock",
  //       duration: 3,
  //     });
  //   }
  // };

  const addCartHandler = () => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else if (selectedColor?.stock > 0 || data?.stock > 0) {
      let payload = {
        product: data?._id,
        quantity: itemCount,
        points: selectedColor?.points,
        color: selectedColor?._id,
        size: selectedSize?._id,
      };

      const res = createCart(payload);
      if (res) {
        navigate("/cart");
      }
    } else {
      notification.error({
        message:
          selectedColor?.stock === 0
            ? "Selected color is out of stock"
            : "Product is out of stock",
        duration: 3,
      });
    }
  };

  const handleAddToWishlist = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    setLoading(true);
    let payload = {
      product: data?._id,
      quantity: itemCount,
      points: selectedColor?.points,
      color: selectedColor?._id,
      size: selectedSize?._id,
    };
    const res = await createWishlist(payload);
    if (res) {
      setLoading(false);
    }
  };
  const handleDeleteWishlistProduct = async (e) => {
    e.stopPropagation();
    setLoading(true);
    const res = await deleteWishlist(wishlist?._id, data?._id);
    if (res) {
      setLoading(false);
    }
  };

  const truncateText = (text, maxLength) => {
    if (data?.name?.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="product-details">
      {loading ? (
        <Spin
          size={"large"}
          style={{
            height: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      ) : (
        <div className="layoutPaddingInline">
          <Row gutter={[40, 20]}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <div className="leftProductIMGs">
                <div className="activeIMG" style={{ width: "100%" }}>
                  <ImageGallery
                    showNav={false}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    items={imageGalleryItems || []}
                  />
                </div>
              </div>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <div className="rightProductDetails">
                <span>
                  <img
                    src={backICON}
                    alt="back-icon"
                    onClick={() => {
                      navigate("/");
                    }}
                  />
                </span>

                <div className="breadcrumb">
                  <Breadcrumb
                    items={[
                      {
                        title: data?.category?.name,
                      },
                      {
                        title: data?.subCategory?.name,
                      },
                      {
                        title: truncateText(data?.name, 60),
                      },
                    ]}
                  />
                </div>

                <div className="rating-wishlist-section">
                  {/* <div className="rating">
                  <Rate disabled value={rating} />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0 5px",
                    }}
                  >
                    <p className="ratingNumber">{rating}/</p>
                    <p className="ratingNumber">{outofRating}</p>
                  </div>
                  <p className="numberOFRating">({numberOFRating})</p>
                </div> */}
                  <div
                    className="wishlistBTN"
                    onClick={(e) => {
                      if (
                        wishlist?.products?.find(
                          (ele) => ele?.product?._id === data?._id
                        )
                      ) {
                        handleDeleteWishlistProduct(e);
                      } else {
                        handleAddToWishlist(e);
                      }
                    }}
                  >
                    {wishlist?.products?.find(
                      (ele) => ele?.product?._id === data?._id
                    ) ? (
                      wishliashloading ? (
                        <Spin />
                      ) : (
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="blue"
                          >
                            <path
                              d="M20.8401 4.60987C20.3294 4.09888 19.7229 3.69352 19.0555 3.41696C18.388 3.14039 17.6726 2.99805 16.9501 2.99805C16.2276 2.99805 15.5122 3.14039 14.8448 3.41696C14.1773 3.69352 13.5709 4.09888 13.0601 4.60987L12.0001 5.66987L10.9401 4.60987C9.90843 3.57818 8.50915 2.99858 7.05012 2.99858C5.59109 2.99858 4.19181 3.57818 3.16012 4.60987C2.12843 5.64156 1.54883 7.04084 1.54883 8.49987C1.54883 9.95891 2.12843 11.3582 3.16012 12.3899L4.22012 13.4499L12.0001 21.2299L19.7801 13.4499L20.8401 12.3899C21.3511 11.8791 21.7565 11.2727 22.033 10.6052C22.3096 9.93777 22.4519 9.22236 22.4519 8.49987C22.4519 7.77738 22.3096 7.06198 22.033 6.39452C21.7565 5.72706 21.3511 5.12063 20.8401 4.60987V4.60987Z"
                              stroke="url(#paint0_linear_1200_3265)"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_1200_3265"
                                x1="4.32632"
                                y1="2.99808"
                                x2="29.0582"
                                y2="3.45411"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#73DDFF" />
                                <stop offset="0.505208" stop-color="#3D67D4" />
                                <stop offset="1" stop-color="#8908A9" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      )
                    ) : wishliashloading ? (
                      <Spin />
                    ) : (
                      <img src={heartICON} alt="heart-icon" />
                    )}
                    <p
                      className="gradientText"
                      onClick={(e) => {
                        if (user?.wishlist?.find((ele) => ele === data?._id)) {
                          handleDeleteWishlistProduct(e);
                        } else {
                          handleAddToWishlist(e);
                        }
                      }}
                    >
                      Add to Wishlist
                    </p>
                  </div>
                </div>

                <div className="product-name-description">
                  {/* <p>{data?.name}</p> */}
                  <Tooltip title={data?.name}	>
                    <p>{truncateText(data?.name, 60)}</p>
                  </Tooltip>
                  <p>{data?.description}</p>
                </div>
                <div className="price-section">
                  <Points
                    points={
                      selectedColor?.points
                        ? selectedColor?.points
                        : data?.points
                    }

                  // points={
                  //   data?.deliveryFee
                  // }
                  />
                </div>
                <div className="product-from">
                  <img src={amazonLogo} alt="product-from" />
                  <p>Amazon</p>
                </div>

                {!data?.product?.deliveryFee && (
                  <div
                    className="points"
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <label>Delivery Fee: </label>
                    <Points points={data?.deliveryFee} />
                  </div>
                )}
                <div
                  className="size"
                  style={{ display: "flex", gap: ".3rem", fontSize: "18px" }}
                >
                  {selectedSize?.size === "Fixed" ||
                    ((data?.variations
                      ? data?.variations?.length > 0
                      : false) && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".3rem",
                          }}
                        >
                          <p style={{ color: "var(--darkgray)" }}>Size:</p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: ".3rem",
                            }}
                          >
                            {data?.variations?.map((item, i) => (
                              <p
                                style={{
                                  fontWeight:
                                    item?._id === selectedSize?._id ? 800 : 400,
                                  cursor: "pointer",
                                }}
                                onClick={() => setSelectedSize(item)}
                              >
                                {item?.size}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                </div>

                <div className="colorSelection">
                  {selectedSize?.colors?.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".3rem",
                      }}
                    >
                      <p style={{ color: "var(--darkgray)" }}>Colors</p>
                      <div style={{ display: "flex", gap: ".3rem" }}>
                        {selectedSize?.colors?.map((item) => (
                          <div
                            className="colors1"
                            style={{
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
                </div>

                {selectedColor?.stock && selectedColor?.stock < 1 ? (
                  <p style={{ color: "red", fontWeight: "600" }}>
                    Out of Stock
                  </p>
                ) : null}

                {!selectedColor?.stock && data?.stock < 1 ? (
                  <p style={{ color: "red", fontWeight: "600" }}>
                    Out of Stock
                  </p>
                ) : null}

                {/* {selectedColor?.stock ? (selectedColor?.stock < 1 && data?.stock < 1) ? <p style={{ color: 'red', fontWeight: '600' }}>Item Out of Stock</p> : data?.stock < 1 && <p style={{ color: 'red', fontWeight: '600' }}>Item Out of Stock</p> : } */}

                <div className="cart-plus-minus">
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
                    />{" "}
                    <img src={plus} alt="plus" onClick={handleIncrease}></img>
                  </div>
                  <button
                    disabled={
                      selectedColor?.stock
                        ? selectedColor?.stock < 1
                          ? true
                          : false
                        : data?.stock < 1
                          ? true
                          : false
                    }
                    className={
                      selectedColor?.stock
                        ? selectedColor?.stock < 1
                          ? "customBtn_disabled"
                          : "primaryButton customBTN"
                        : data?.stock < 1
                          ? "customBtn_disabled"
                          : "primaryButton customBTN"
                    }
                    onClick={() => addCartHandler()}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
