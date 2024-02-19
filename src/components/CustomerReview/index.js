import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { BiSolidQuoteAltRight } from "react-icons/bi";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

import { Avatar, Rate } from "antd";
import { useAppSelector } from "../../store/hooks";
import { getReviews } from "../../store/services/review";

const CustomerReview = () => {
  const { reviews } = useAppSelector((state) => state.review);

  useEffect(() => {
    _getReviews();
  }, []);

  const _getReviews = async () => {
    await getReviews();
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 2000 },
      items: 4.8,
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 2.8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 700 },
      items: 1.8,
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
    },
  };

  const ButtonGroup = ({ next, previous }) => {
    // eslint-disable-next-line
    return (
      <div className="carousel_button">
        <div onClick={previous}>
          <IoIosArrowRoundBack color="var(--white)" size={22} />
        </div>
        <div onClick={next}>
          <IoIosArrowRoundForward color="var(--white)" size={22} />
        </div>
      </div>
    );
  };

  return (
    <div className="customer_review_container_main">
      <img
        src={require("../../assets/images/review-left.png")}
        className="left_img"
        alt="review"
      />
      <img
        src={require("../../assets/images/review-right.png")}
        className="right_img"
        alt="review"
      />
      <div className="customer_review_container">
        <h1>Our Customers Review</h1>
        <p>
          Groclone is trusted by fastest growth companies the focus on financial
          management Here`s what they have to say about us.
        </p>
        <div className="cr_carousel_box">
          <Carousel
            responsive={responsive}
            arrows={false}
            renderButtonGroupOutside={true}
            customButtonGroup={<ButtonGroup />}
          >
            {reviews?.map((v, i) => {
              return (
                <div key={i} className="review_card_wrapper">
                  <div key={i} className="review_card">
                    <p>{v?.comments}</p>
                    <div className="rc_bottom">
                      <div className="rc_detail">
                        <Avatar src={v?.imageUrl} size={40} />
                        <div className="rc_name_rating">
                          <p>{v?.name}</p>
                          <Rate allowHalf defaultValue={v?.rating} disabled />
                        </div>
                      </div>
                      <BiSolidQuoteAltRight color="#fff" size={80} />
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
