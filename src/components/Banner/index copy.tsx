// import React, { useState } from "react";
// import { Dropdown, Input, Select, Space, Button } from "antd";
// import SearchIcon from "../../assets/images/search.svg";
// import filterIcon from "../../assets/images/filter.svg";

// import rewardBannerIMG from "../../assets/images/rewardIMG.png";
// import categoriesBannerIMG from "../../assets/images/categoriesBannerIMG.png";
// import wishlistBannerIMG from "../../assets/images/wishlistBannerIMG.png";
// // import giftIcon from "../../assets/images/giftIcon.svg";
// // import locationICON from "../../assets/images/locationICON.svg";
// import FilterDropdown from "./FilterDropdown";

// interface Props {
//   location: string;
//   setSearch?: Function;
//   setSubCategories?: Function;
//   setMinRange?: Function;
//   setMaxRange?: Function;
// }

// const Banner: React.FC<Props> = ({
//   location,
//   setSearch,
//   setSubCategories,
//   setMinRange,
//   setMaxRange,
// }) => {
//   const [isDropdownVisible, setDropdownVisible] = useState(false);

//   const handleVisibleChange = (visible: boolean) => {
//     setDropdownVisible(visible);
//   };

//   // const handleLLocationChange = (value: string) => {
//   //   console.log(`selected ${value}`);
//   // };
//   // const handleLDealChange = (value: string) => {
//   //   console.log(`selected ${value}`);
//   // };

//   return (
//     <div className="Banner">
//       <img
//         src={
//           location === "rewards"
//             ? rewardBannerIMG
//             : location === "categories"
//             ? categoriesBannerIMG
//             : location === "products"
//             ? rewardBannerIMG
//             : location === "wishlist"
//             ? wishlistBannerIMG
//             : ""
//         }
//         alt={
//           location === "reward"
//             ? "reward"
//             : "categories"
//             ? "products"
//             : "wishlist"
//         }
//       />
//       {location === "rewards" ? (
//         <p>Rewards</p>
//       ) : location === "categories" ? (
//         <p>Categories</p>
//       ) : location === "products" ? (
//         <p>Products</p>
//       ) : location === "wishlist" ? (
//         <p>Wishlist</p>
//       ) : null}

//       <div className="BannerContainer">
//         <div className="leftContainer">
//           {/* {location !== "reward" && (
//             <div className="locationDropdown">
//               <img src={locationICON} alt="locationICON" />
//               <Select
//               className="BANNER_SELECTION"
//                 defaultValue="newyork"
//                 onChange={handleLLocationChange}
//                 bordered={false}
//                 options={[
//                   { value: "newyork", label: "New York" },
//                   { value: "taxes", label: "Texas" },
//                   { value: "arizon", label: "Arizon" },
//                   { value: "illinok", label: "Illinok" },
//                 ]}
//               />
//             </div>
//           )} */}
//           {/* <div className="locationDropdown">
//             <img src={giftIcon} alt="giftIcon" />
//             <Select
//               className="BANNER_SELECTION"
//               defaultValue="deal1"
//               onChange={handleLDealChange}
//               bordered={false}
//               options={[
//                 { value: "deal1", label: "Deal 1" },
//                 { value: "deal2", label: "Deal 2" },
//                 { value: "deal3", label: "Deal 3" },
//                 { value: "deal4", label: "Deal 4" },
//               ]}
//             />
//           </div> */}
//           {location && (
//             <div className="category_button_box">
//               <Button type="primary" className={`${"primaryButton"}`}>
//                 {/* <span className="gradientText">Amazon</span> */}
//                 All
//               </Button>
//               <Button type="primary" className={`${"whiteButton"}`}>
//                 <span className="gradientText">Experiences</span>
//               </Button>
//               <Button type="primary" className={`${"whiteButton"}`}>
//                 <span className="gradientText">Celebrations</span>
//               </Button>
//               <Button type="primary" className={`${"whiteButton"}`}>
//                 <span className="gradientText">Special Programs</span>
//               </Button>
//             </div>
//           )}
//         </div>
//         <div className="rightContainer">
//           <div className="search_input_box">
//             <Input
//               placeholder="Search"
//               prefix={<img src={SearchIcon} alt={"Search"} />}
//               allowClear
//               onChange={(e) => setSearch && setSearch(e.target.value)}
//             />
//           </div>
//           {location !== "category" && (
//             <Dropdown
//               className="FILTER_DROPDOWN"
//               // menu={{ items: filterMenu }}
//               overlay={
//                 <FilterDropdown
//                   setDropdownVisible={setDropdownVisible}
//                   setSearch={setSearch}
//                   setSubCategories={setSubCategories}
//                   setMinRange={setMinRange}
//                   setMaxRange={setMaxRange}
//                 />
//               }
//               placement="bottom"
//               trigger={["click"]}
//               open={isDropdownVisible}
//               onOpenChange={handleVisibleChange}
//             >
//               <div className="filterBox">
//                 <p onClick={(e) => e.preventDefault()}>
//                   <Space>
//                     <img src={filterIcon} alt="filterIcon" />
//                   </Space>
//                 </p>
//               </div>
//             </Dropdown>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;

import React from "react";

const index = () => {
  return <div>indey</div>;
};

export default index;
