import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const FilterSidebar = ({
  allProducts,
  priceRange,
  search,
  setSearch,
  brand,
  setBrand,
  category,
  setCategory,
  setPriceRange,
}) => {
  const Categories = allProducts.map((p) => p.category);
  const UniqueCategory = ["All", ...new Set(Categories)];

  const Brands = allProducts.map((p) => p.brand);
  const UniqueBrands = ["All", ...new Set(Brands)];

  const handleCategoryClick = (val) => {
    setCategory(val);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= priceRange[1]) setPriceRange([value, priceRange[1]]);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= priceRange[0]) setPriceRange([priceRange[0], value]);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 99999]);
  };

  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-64 ">
      {/* search */}
      <Input
        type="text"
        placeholder="search..."
        value={search}
        onChnage={(e) => setSearch(e.target.value)}
        className="bg-white rounded-md border-gray-400 border-2 w-full"
      />
      {/* Category */}
      <h1 className=" mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {UniqueCategory.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="radio"
              checked={category === item}
              onChange={() => handleCategoryClick(item)}
            ></input>
            <label htmlFor="">{item}</label>
          </div>
        ))}
      </div>
      {/* brands */}
      <h1 className="mt-5 font-semibold text-xl">Brands</h1>
      <select
        name=""
        id=""
        className="w-full border-gray-200 border-2 rounded-md p-2"
        value={brand}
        onChange={handleBrandChange}
      >
        {UniqueBrands.map((item, index) => (
          <option value="" key={index}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>
      {/* Price Range */}
      <h1 className=" font-semibold text-xl mt-5">Price Range</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="">
          Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
        </label>
        <div className="flex gap-2 bg-amber-50 items-center">
          <input
            type="number"
            min="0"
            max="5000"
            className="border-gray-300 rounded border w-20 p-1 "
            value={priceRange[0]}
            onChange={handleMinChange}
          />
          <span> - </span>
          <input
            type="number"
            min="0"
            max="99999"
            value={priceRange[1]}
            onChange={handleMaxChange}
            className="border-gray-300 rounded border w-20 p-1 "
          />
        </div>
        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          value={priceRange[0]}
          onChange={handleMinChange}
          className="w-full"
        />
        <input
          type="range"
          min="0"
          max="99999"
          step="100"
          value={priceRange[1]}
          onChange={handleMaxChange}
          className="w-full"
        />
      </div>
      {/* Reset Buttion */}
      <Button onClick={resetFilters} className="w-full bg-pink-600 mt-5 cursor-pointer text-white">
        Reset Filter
      </Button>
    </div>
  );
};

export default FilterSidebar;
