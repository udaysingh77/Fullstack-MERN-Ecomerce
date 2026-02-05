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

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      let res = await axios.get("http://localhost:3000/api/v1/product/all-products", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.status) {
        setAllProducts(res.data.products);
      }
      console.log("allProducts=>", allProducts);
    } catch (error) {
      console.log(error);
      toast.error(error.response, data.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="p-20 pb-10">
      <div className="max-w-7xl mx-auto gap-7">
        {/* Sidebar */}
        <FilterSidebar />
        {/* Main Product Section */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-end mb-4">
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
        {/* Product list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
          {allProducts.map((products) => {
            return <ProductCard products={products} key={products._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
