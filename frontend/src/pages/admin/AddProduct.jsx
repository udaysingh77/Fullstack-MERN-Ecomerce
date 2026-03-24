import React, { useState } from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { setProducts } from "../../redux/productSlice";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: 0,
    productDesc: "",
    productImg: [],
    brand: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const { products } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("productPrice", productData.productPrice);
    formData.append("productDesc", productData.productDesc);
    formData.append("brand", productData.brand);
    formData.append("category", productData.category);
    if (productData.productImg.length == 0) {
      toast.error("please add at least one product");
      return;
    }
    productData.productImg.forEach((img) => formData.append("files", img));
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      console.log("formData=>", formData);
      console.log("token=>", token);
      const res = await axios.post("http://localhost:3000/api/v1/product/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.status) {
        dispatch(setProducts([...products, res.data.product]));
        setProductData({
          productName: "",
          productPrice: 0,
          productDesc: "",
          productImg: [],
          brand: "",
          category: "",
        });
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="pl-[350px] pr-20 py-6 bg-gray-100 min-h-screen flex">
      <Card className="w-full my-20">
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
          <CardDescription>Enter Product Details below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col  gap-2">
            <div className="grid gap-2">
              <Label>Product Name</Label>
              <Input
                type="text"
                name="productName"
                value={productData.productName}
                onChange={handleChange}
                placeholder="Ex:- Iphone"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Price</Label>
              <Input
                type="number"
                name="productPrice"
                value={productData.productPrice}
                onChange={handleChange}
                placeholder=""
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Brand</Label>
                <Input
                  type="text"
                  placeholder="Ex- Samsung"
                  value={productData.brand}
                  onChange={handleChange}
                  name="brand"
                ></Input>
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Input
                  type="text"
                  name="category"
                  placeholder="Ex= mobile"
                  value={productData.category}
                  onChange={handleChange}
                ></Input>
              </div>
            </div>
            <div className="grid gap-2">
              <div className=" flex items-center">
                <Label>Description</Label>
              </div>
              <Textarea
                name="productDesc"
                value={productData.productDesc}
                onChange={handleChange}
                placeholder="Enter brif description of product"
              />
            </div>
            <ImageUpload productData={productData} setProductData={setProductData} />
          </div>
          <CardFooter className="flex-col gap-2">
            <Button
              disabled={loading}
              className="w-full bg-pink-600 cursor-pointer mt-6"
              onClick={submitHandler}
              type="submit"
            >
              {loading ? (
                <span className="flex gap-1 items-center">
                  <Loader2 className="animate-spin" /> Please Wait
                </span>
              ) : (
                "Add Product"
              )}
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
