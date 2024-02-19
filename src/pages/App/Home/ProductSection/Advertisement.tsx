import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import { getBanner } from "../../../../store/services/advertisement";
import { AdType } from "../../../../store/interfaces/Advertisement";

const Advertisement: React.FC = () => {
  const [bannerData, setBannerData] = useState<AdType | null>(null);

  useEffect(() => {
    getAdvertiseBanner();
  }, []);

  const getAdvertiseBanner = async () => {
    const data = await getBanner();
    setBannerData(data);
  };

  return (
    <div className="permotion_container">
      <Row gutter={[20, 20]}>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <div className="permotion_left">
            <span className="gradientText">{bannerData?.tag}</span>
            <h1>{bannerData?.title}</h1>
            <Button
              type="primary"
              className="primaryButton largeScreenBTN"
              style={{ width: "max-content" }}
              onClick={() => window.open(bannerData?.url)}
            >
              {bannerData?.buttonText}
            </Button>
          </div>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <div className="permotion_right">
            <img
              src={bannerData?.image}
              alt="img"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <Button
            type="primary"
            className="primaryButton smallScreenBTN"
            style={{ width: "max-content", marginTop: "2rem" }}
            onClick={() => window.open(bannerData?.url)}
          >
            {bannerData?.buttonText}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Advertisement;
