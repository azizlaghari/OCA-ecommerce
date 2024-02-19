import React, { useEffect, useState } from "react";
import { Col, Row, Spin } from "antd";

import Banner from "../../../components/Banner";
import RewardCard from "../../../components/RewardCard";
import Header from "../../../components/Header";
import CustomerReview from "../../../components/CustomerReview";
import Footer from "../../../components/Footer";

import star from "../../../assets/images/star.svg";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getReward } from "../../../store/services/rewards";
import { RewardsType } from "../../../store/interfaces/Rewards";
import { setGlobalSearch } from "../../../store/slices/productSlice";

const Rewards: React.FC = () => {
  const { loading, allRewards } = useAppSelector((state) => state.reward);
  const [displayedRewards, setDisplayedRewards] = useState(8);
  const { search } = useAppSelector((state) => state.products);
  const [filterdData, setFilterdData] = useState<Array<RewardsType>>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setFilterdData(
      allRewards?.filter((v) =>
        v?.price.toString().toLowerCase().includes(search.toLowerCase().trim())
      )
    );
  }, [allRewards, search]);

  useEffect(() => {
    return () => {
      dispatch(setGlobalSearch(""));
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllReward();
  }, []);

  const getAllReward = async () => await getReward();

  const handleLoadMore = () => setDisplayedRewards((pre) => pre + 8);

  return (
    <div className="rewards">
      <Header />

      <div className="layoutPaddingInline ">
        <Banner location={"rewards"} />
      </div>

      {loading ? (
        <div className="NoHistory" style={{ height: "50vh" }}>
          <Spin size="large" style={{ paddingTop: "40px" }} />
        </div>
      ) : allRewards?.length >= 1 ? (
        <div
          className="layoutPaddingInline customPadding"
          // style={{ paddingBlock: "80px", width: "100%" }}
        >
          <Row gutter={[20, 20]}>
            {filterdData?.length > 0 ? (
              filterdData
                ?.slice(0, displayedRewards)
                ?.map((v: RewardsType, i: number) => {
                  return (
                    <Col key={i} xs={24} sm={12} lg={8} xl={6} xxl={6}>
                      <RewardCard data={v} />
                    </Col>
                  );
                })
            ) : (
              <div className="NoHistory" style={{ width: "100%" }}>
                <div className="empty">
                  <img src={star} alt="emptyHistory" />
                  <p className="emptyText" style={{ paddingBottom: "40px" }}>
                    No Rewards Found
                  </p>
                </div>
              </div>
            )}
          </Row>
        </div>
      ) : (
        <div className="NoHistory">
          <div className="empty">
            <img src={star} alt="emptyHistory" />
            <p className="emptyText" style={{ paddingBottom: "40px" }}>
              No Rewards Found
            </p>
          </div>
        </div>
      )}

      {allRewards?.length > 0 &&
        displayedRewards < allRewards?.length &&
        search === "" && (
          <button
            className="primaryButton customButton"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )}
      {filterdData?.length > 0 &&
        displayedRewards < filterdData?.length &&
        search !== "" && (
          <button
            className="primaryButton customButton"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )}

      <CustomerReview />
      <Footer />
    </div>
  );
};

export default Rewards;
