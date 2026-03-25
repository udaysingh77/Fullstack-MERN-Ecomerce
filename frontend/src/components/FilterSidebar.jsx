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


  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 99999]);
  };

  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-[60vh] hidden md:block min-w-[300px] max-w-[300px] overflow-y-auto">

      {/* Search */}
      <Input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white rounded-md border-gray-400 border-2 w-full"
      />

      {/* Category */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {UniqueCategory.map((item, index) => (
          <label key={index} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={category === item}
              onChange={() => handleCategoryClick(item)}
            />
            {item}
          </label>
        ))}
      </div>

      {/* Brands */}
      <h1 className="mt-5 font-semibold text-xl">Brands</h1>
      <select
        className="w-full border-gray-200 border-2 rounded-md p-2"
        value={brand}
        onChange={handleBrandChange}
      >
        <option value="">All Brands</option>
        {UniqueBrands.map((item, index) => (
          <option value={item} key={index}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Price Range */}
      <h1 className="font-semibold text-xl mt-5">Price Range</h1>

      <label>
        ₹{priceRange[0]} - ₹{priceRange[1]}
      </label>

      <div className="flex gap-2 items-center mt-2">
        <input
          type="number"
          min="0"
          max="99999"
          className="border-gray-300 rounded border w-20 p-1"
          value={priceRange[0]}
          onChange={(e) =>
            setPriceRange([Math.min(Number(e.target.value), priceRange[1]), priceRange[1]])
          }
        />

        <span>-</span>

        <input
          type="number"
          min="0"
          max="99999"
          className="border-gray-300 rounded border w-20 p-1"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0])])
          }
        />
      </div>

      {/* Range Sliders */}
      <input
        type="range"
        min="0"
        max="99999"
        step="100"
        value={priceRange[0]}
        onChange={(e) =>
          setPriceRange([Math.min(Number(e.target.value), priceRange[1]), priceRange[1]])
        }
        className="w-full mt-2"
      />

      <input
        type="range"
        min="0"
        max="99999"
        step="100"
        value={priceRange[1]}
        onChange={(e) =>
          setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0])])
        }
        className="w-full"
      />

      {/* Reset Button */}
      <Button
        onClick={resetFilters}
        className="w-full bg-pink-600 mt-5 cursor-pointer text-white hover:bg-pink-700"
      >
        Reset Filter
      </Button>
    </div>
  );
};

export default FilterSidebar;
