import React, { useEffect, useState } from "react";
import { Divider, Input, InputNumber } from "antd";
import cancelIcon from "../../assets/images/cancelIcon.svg";
import filterSearchIcon from "../../assets/images/search-outline.svg";

import { RxCross2 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import { getCategory } from "../../store/services/categories";
import { CategoryType } from "../../store/interfaces/Category";
// import { filterProducts } from "../../store/services/product";

interface Props {
  location?: string;
  setDropdownVisible: Function;
  setSearch?: Function;
  setMinRange?: Function;
  setMaxRange?: Function;
  categoryId?: string;
  handleShowResults?: (arg?: any) => void;
  setSelectedAllCategories?: Function;
  search?: string;
}

const FilterDropdown = (props: Props) => {
  const {
    setDropdownVisible,
    setSearch,
    setMinRange,
    setMaxRange,
    categoryId,
    handleShowResults,
    setSelectedAllCategories,
    location,
    search,
  } = props;

  const [Categories, setCategories] = useState<String[] | null>(null);
  const [subCateogires, setSubCategoreies] = useState<Array<CategoryType>>([]);
  const [minPrice, setMinPrice] = useState<number | null>(0);
  const [maxPrice, setMaxPrice] = useState<number | null>(0);
  const [onClear, setOnClear] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<any>({
    search: false,
    category: false,
    minMax: false,
    count: 0,
  });

  useEffect(() => {
    if (setSelectedAllCategories) {
      setSelectedAllCategories(Categories);
    }
    // eslint-disable-next-line
  }, [Categories]);

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (categoryId) {
      let tempArr = [String(categoryId)];
      setCategories(tempArr);
    } else {
      setCategories([]);
    }
  }, [categoryId]);

  useEffect(() => {
    if (!onClear && Categories !== null) {
      if (Categories?.length > 0) {
        if (!selectedFilters?.category) {
          setSelectedFilters({
            ...selectedFilters,
            category: true,
            count: Number(selectedFilters?.count) + 1,
          });
        }
      } else {
        if (selectedFilters.count !== 0) {
          setSelectedFilters({
            ...selectedFilters,
            category: false,
            count: Number(selectedFilters?.count) - 1,
          });
        }
      }
    }
  }, [Categories]);

  const getAll = async () => {
    try {
      const data = await getCategory({ type: "subcategory" });
      setSubCategoreies(data);
    } catch (err) {
      console.log({ err });
    }
  };

  const onChangeMin = (value: number | null) => {
    setMinPrice(value);
    setMinRange && setMinRange(value);
    // updateSelectedFiltersCount();

    if (value !== null) {
      if (!selectedFilters?.minMax) {
        setSelectedFilters({
          ...selectedFilters,
          minMax: true,
          count: Number(selectedFilters.count) + 1,
        });
      }
    } else {
      if (maxPrice === 0 || maxPrice === null) {
        setSelectedFilters({
          ...selectedFilters,
          minMax: false,
          count: Number(selectedFilters.count) - 1,
        });
      }
    }
  };

  const onChangeMax = (value: number | null) => {
    setMaxPrice(value);
    setMaxRange && setMaxRange(value);

    if (value !== null) {
      if (!selectedFilters?.minMax) {
        setSelectedFilters({
          ...selectedFilters,
          minMax: true,
          count: Number(selectedFilters.count) + 1,
        });
      }
    } else {
      if (minPrice === 0 || minPrice === null) {
        setSelectedFilters({
          ...selectedFilters,
          minMax: false,
          count: Number(selectedFilters.count) - 1,
        });
      }
    }
  };

  const handleSearch = (value: string) => {
    setSearch && setSearch(value.toLowerCase());
    if (value?.length > 0) {
      if (!selectedFilters?.search) {
        setSelectedFilters({
          ...selectedFilters,
          search: true,
          count: Number(selectedFilters?.count) + 1,
        });
      }
    } else {
      setSelectedFilters({
        ...selectedFilters,
        search: false,
        count: Number(selectedFilters?.count) - 1,
      });
    }
    // updateSelectedFiltersCount();
  };

  const sizeOnChange = (type: string) => {
    setCategories((prevCategories: any) => {
      const isCategorySelected = prevCategories.includes(type);
      if (isCategorySelected) {
        return prevCategories.filter((category: any) => category !== type);
      } else {
        return [...prevCategories, type];
      }
    });
  };

  const renderCategory = (type: string, name: string) => (
    <p
      key={type}
      onClick={() => sizeOnChange(type)}
      style={{
        background:
          Categories && Categories?.includes(type)
            ? "linear-gradient(91deg, #73DDFF 13.08%, #3D67D4 71.93%, #8908A9 129.56%)"
            : "",
        color: Categories && Categories?.includes(type) ? "var(--white)" : "",
      }}
    >
      {location === "products" ? name : "Category"}
      {Categories && Categories.includes(type) ? <RxCross2 /> : <FiPlus />}
    </p>
  );

  const clearFilters = () => {
    setSearch && setSearch("");
    setCategories && setCategories([]);
    setSelectedAllCategories && setSelectedAllCategories([]);
    setMinPrice(0);
    setMinRange && setMinRange(0);
    setMaxPrice(0);
    setMaxRange && setMaxRange(0);

    // Reset the selectedFilters state
    setSelectedFilters({
      search: false,
      category: false,
      minMax: false,
      count: 0,
    });

    const payload = {
      search: "",
      subCategories: [],
      pointsRange: {
        min: 0,
        max: 0,
      },
      // page: 1,
      // perPage: 10,
    };

    // filterProducts(payload);
    if (location === "products") {
      handleShowResults && handleShowResults(payload);
    }

    setTimeout(() => {
      // filterProducts(payload);

      setOnClear(false);
    }, 1000);
  };

  const formatter = (value: any) => {
    return value.replace("-", "");
  };
  const parser = (value: any) => {
    return value.replace("-", "");
  };

  return (
    <div className="filter">
      <div className="header">
        <p>Filters ({selectedFilters?.count} selected )</p>
        <img
          src={cancelIcon}
          alt="cancel-icon"
          onClick={() => setDropdownVisible(false)}
        />
      </div>
      <div className="search_input_box">
        <Input
          placeholder="Search for products"
          prefix={<img src={filterSearchIcon} alt={"Search"} />}
          allowClear
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <Divider className="filterDivider" />
      <div className="filterCategories">
        <label className="filterLabel">Categories</label>
        <span className="CategoriesContainer">
          {subCateogires.map((type) => renderCategory(type?._id, type?.name))}
        </span>
      </div>
      <Divider className="filterDivider" />
      <div className="filterPriceRange">
        <label className="filterLabel">Price Range</label>
        <div className="MinMaxInputs">
          <InputNumber
            placeholder="Min"
            className="MinMaxInputsField"
            onChange={onChangeMin}
            value={minPrice}
            type="number"
            min={0}
            formatter={formatter}
            parser={parser}
          />
          <InputNumber
            placeholder="Max"
            className="MinMaxInputsField"
            onChange={onChangeMax}
            value={maxPrice}
            type="number"
            min={0}
            formatter={formatter}
            parser={parser}
          />
        </div>
        {/* <div className="priceSlider">
          <Slider
            range
            step={100}
            min={100}
            max={10000}
            // defaultValue={[20, 50]}
            value={[minPrice || 1, maxPrice || 10000]}
            onChange={onChangePriceSlider}
            // onChangeComplete={onChangeComplete}
            className="PRICE_SLIDER"
            tooltip={{ open: false }}
          />
        </div> */}
        <div className="minMaxData" style={{ marginTop: "10px" }}>
          <p className="minMaxValues">${minPrice}</p>
          <p className="minMaxValues">${maxPrice}</p>
        </div>
      </div>
      <Divider className="filterDivider" />
      <div className="filterBTNS">
        <button
          className="outlinedButton cursor filterCancelBTN"
          onClick={() => {
            setOnClear(true);
            clearFilters();
            setDropdownVisible(false);
            // if (handleShowResults) {
            //   if (location === "products") {
            //     handleShowResults();
            //   }
            // }
          }}
        >
          Clear
        </button>
        <button
          className="primaryButton cursor filterCustomBTN"
          onClick={() => {
            if (handleShowResults) {
              if (location === "products") {
                handleShowResults();
              }
            }
            setDropdownVisible(false);
          }}
        >
          Show Results
        </button>
      </div>
    </div>
  );
};

export default FilterDropdown;
