import { ShoppingCart } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { setCart } from "@/redux/productSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const ProductCard = ({ product, loading }) => {
  const { productImg, productPrice, productName } = product;
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCart = async (productId) => {
    try {
      console.log("token=<", token);
      const res = await axios.post(
        "http://localhost:3000/api/v1/cart/add",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("res=>", res.data);
      if (res.data.status) {
        toast.success("Product added to Cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="shadow-lg rounded-lg overflow-hidden flex flex-col h-max">
      <div className="w-full aspect-square overflow-hidden">
        {loading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <img
            onClick={() => navigate(`/products/${product._id}`)}
            src={productImg[0]?.url}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
          />
        )}
      </div>
      {loading ? (
        <div className="p-3 space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-full h-10" />
        </div>
      ) : (
        <div className="p-3 flex flex-col">

          <h1 className="font-semibold h-12 line-clamp-2">
            {productName}
          </h1>

          <h2 className="font-bold">₹{productPrice}</h2>

          <Button
            onClick={() => addToCart(product._id)}
            className="bg-pink-600 mt-2 w-full"
          >
            <ShoppingCart />
            Add to Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
