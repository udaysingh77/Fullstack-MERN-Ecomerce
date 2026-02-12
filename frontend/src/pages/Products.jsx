import FilterSidebar from "@/components/FilterSidebar";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";

const Products = () => {
  const { products } = useSelector((store) => store.product);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 999999999]);
  const [sortOrder, setSortOrder] = useState("");
  const dispatch = useDispatch();
  const getAllProducts = async () => {
    try {
      setLoading(true);
      let res = await axios.get("http://localhost:3000/api/v1/product/all-products", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.status) {
        setAllProducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
      console.log("allProducts=>", allProducts);
    } catch (error) {
      console.log(error);
      toast.error(error.response, data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = [...allProducts];

    if (search.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.productName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (brand !== "All") {
      filtered = filtered.filter((p) => {
        return p.brand === brand;
      });
    }

    if (category !== "All") {
      filtered = filtered.filter((p) => {
        return p.category === category;
      });
    }

    filtered = filtered.filter(
      (p) => p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1]
    );

    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.productPrice - a.productPrice);
    }

    dispatch(setProducts(filtered));
  }, [search, category, brand, sortOrder, priceRange, allProducts, dispatch]);

  useEffect(() => {
    getAllProducts();
  }, []);

  console.log("products=>", products);

  return (
    <div className="p-20 pb-10">
      <div className="max-w-11/12 mx-auto flex justify-between gap-7">
        {/* Sidebar */}
        <FilterSidebar
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          category={category}
          setCategory={setCategory}
          allProducts={allProducts}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
        {/* Product list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 pt-4">
          {products.map((product) => {
            return <ProductCard product={product} key={product._id} />;
          })}
        </div>
        {/* Main Product Section */}
        <div className="flex flex-col flex-1 pt-4">
          <div className="flex mb-4">
            <Select>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowToHigh">Low to High</SelectItem>
                  <SelectItem value="highToLow">Hight to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
