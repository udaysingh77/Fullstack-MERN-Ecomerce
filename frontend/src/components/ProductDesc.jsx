import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";

const ProductDesc = ({ product }) => {
  const token = localhost.getItem("token");
  const dispatch = useDispatch();
  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        `https//:localhost:3000/api/v1/cart/add`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.status) {
        toast.success("Product added to cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-4xl text-gray-800">{product.productName}</div>
      <div className="text-gray-800">
        {product.category} | {product.brand}
      </div>
      <div className="text-pink-500 font-bold text-2xl">{product.productPrice}</div>
      <div className="line-clamp-6 text-muted-foregroundd">{product.productDesc}</div>
      <div className="flex gap-2 items-center w-[300px]">
        <p className="text-gray-800 font-semibold">Quantity:</p>
        <Input type="number" defaultValue={1} className="w-14"></Input>
      </div>
      <Button onClick={() => addToCart(product._id)} className="bg-pink-600">
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductDesc;
