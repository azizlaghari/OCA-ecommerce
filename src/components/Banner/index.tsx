import React, { useState, useEffect } from "react";
import { Dropdown, Input, Button } from "antd";
import SearchIcon from "../../assets/images/search.svg";
import filterIcon from "../../assets/images/filter.svg";

import rewardBannerIMG from "../../assets/images/rewardIMG.png";
import categoriesBannerIMG from "../../assets/images/categoriesBannerIMG.png";
import wishlistBannerIMG from "../../assets/images/wishlistBannerIMG.png";
import FilterDropdown from "./FilterDropdown";
import { setGlobalSearch } from "../../store/slices/productSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllCategories } from "../../store/services/categories";
import { CategoryType } from "../../store/interfaces/Category";
import { setCategoryFilter } from "../../store/slices/categorySlice";

interface Props {
  location: string;
  setSearch?: Function;
  setMinRange?: Function;
  setMaxRange?: Function;
  categoryId?: string;
  handleShowResults?: () => void;
  setSelectedAllCategories?: Function;
  search?: string;
}

const Banner: React.FC<Props> = ({
  location,
  setSearch,
  setMinRange,
  setMaxRange,
  categoryId,
  handleShowResults,
  setSelectedAllCategories,
  search,
}) => {
  const { categoryFilter, categories } = useAppSelector(
    (state) => state.category
  );
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [categButtons, setCategButtons] = useState<Array<CategoryType>>([]);

  useEffect(() => {
    if (location === "categories") {
      getAll();
    }
  }, [location]);

  useEffect(() => {
    categoriesForButtons();
  }, [categories]);

  const categoriesForButtons = () => {
    const temp = [...categories];
    let filter: Array<CategoryType> = temp
      ?.filter((v: CategoryType) => v?.categoryType === "category")
      .slice(0, 3);

    if (filter?.length > 0) {
      filter?.unshift({
        _id: "All",
        name: "All",
        categoryType: "",
        categoryId: null,
        imageUrl: "",
      } as CategoryType);
    }

    setCategButtons(filter);
  };

  const getAll = async () => {
    // call for filter button and categories page
    await getAllCategories();
  };

  const dispatch = useAppDispatch();

  const handleVisibleChange = (visible: boolean) => {
    setDropdownVisible(visible);
  };

  const getImage = () => {
    return location === "rewards"
      ? rewardBannerIMG
      : location === "categories"
      ? categoriesBannerIMG
      : location === "products"
      ? rewardBannerIMG
      : location === "wishlist"
      ? wishlistBannerIMG
      : "";
  };

  const getName = () => {
    return location === "rewards" ? (
      <p>Rewards</p>
    ) : location === "categories" ? (
      <p>Categories</p>
    ) : location === "products" ? (
      <p>Products</p>
    ) : location === "wishlist" ? (
      <p>Wishlist</p>
    ) : null;
  };

  return (
    <div className="Banner">
      <img src={getImage()} alt={"bg_img"} />
      {getName()}

      <div
        className="BannerContainer"
        style={{
          justifyContent:
            location === "categories" ? "space-between" : "flex-end",
        }}
      >
        {location === "categories" && (
          <div className="leftContainer">
            <div className="category_button_box">
              {categButtons?.map((v: CategoryType) => {
                return (
                  <Button
                    key={v?._id}
                    type="primary"
                    className={`${
                      categoryFilter === v?._id
                        ? "primaryButton"
                        : "outlinedButton"
                    }`}
                    onClick={() => dispatch(setCategoryFilter(v?._id))}
                  >
                    {categoryFilter === v?._id ? (
                      v?.name
                    ) : (
                      <span className="gradientText">{v?.name}</span>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
        <div className="rightContainer">
          <div className="search_input_box">
            <Input
              placeholder="Search"
              prefix={<img src={SearchIcon} alt={"Search"} />}
              allowClear
              onChange={(e) => dispatch(setGlobalSearch(e.target.value))}
            />
          </div>
          {location === "products" && (
            <Dropdown
              className="FILTER_DROPDOWN"
              // menu={{ items: filterMenu }}
              overlay={
                <FilterDropdown
                  search={search}
                  location={location}
                  setDropdownVisible={setDropdownVisible}
                  setSearch={setSearch}
                  setMinRange={setMinRange}
                  setMaxRange={setMaxRange}
                  categoryId={categoryId}
                  handleShowResults={handleShowResults}
                  setSelectedAllCategories={setSelectedAllCategories}
                />
              }
              placement="bottom"
              trigger={["click"]}
              open={isDropdownVisible}
              onOpenChange={handleVisibleChange}
            >
              <div className="filterBox">
                <div onClick={(e) => e.preventDefault()}>
                  <img width={'100%'} src={filterIcon} alt="filterIcon" />
                </div>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
