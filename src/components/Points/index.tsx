import React from "react";
import star from "../../assets/images/star.svg";

interface PointsProps {
  points?: number | undefined;
  price?: number | undefined;
}

const Points: React.FC<PointsProps> = ({
  points,
  // price
}) => {
  return (
    <div>
      <div style={styles.pointBox}>
        <img width={24} src={star} alt="star" />
        <p style={styles.points}>{points}</p>
        {/* {price && <p style={styles.price}>${price || 25}</p>} */}
      </div>
    </div>
  );
};

const styles = {
  pointBox: {
    display: "flex",
    alignItems: "center",
    gap: ".3rem",
  },
  points: {
    color: "var(--black)",
    fontFamily: "Sora",
    fontSize: "20px",
    fontWeight: 500,
    letterSpacing: "-0.28px",

  },
  price: {
    color: "var(--darkGray)",
    fontFamily: "Sora",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "32px",
    letterSpacing: "-0.16px",
  },
};

export default Points;
