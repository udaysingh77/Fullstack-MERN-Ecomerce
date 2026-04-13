import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import manocin from "../assets/manicon.png";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { setCart } from "@/redux/productSlice";
import axios from "axios";

const Cart = () => {
  const { cart } = useSelector((store) => store.product);
  console.log("cart=>", cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subTotal = cart?.totalPrice || 0;
  const shipping = subTotal > 300 ? 0 : 10;
  const tax = parseFloat((subTotal * 0.05).toFixed(2)); //5%
  const total = parseFloat((subTotal + shipping + tax).toFixed(2));

  const token = localStorage.getItem("token");
  const API = `http://localhost:3000/api/v1/cart`;

  const handleUpdateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.status) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadCart = async () => {
    try {
      const res = await axios.get(`${API}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.status) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId },
      });
      if (res.data.status) {
        dispatch(setCart(res.data.cart));
        toast.success("Product removed from Cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCart();
  }, [dispatch]);

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {cart?.items?.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-7">Shooping Cart</h1>
          <div className="max-w-7xl mx-auto flex gap-7">
            <div className=" flex flex-col gap-5 flex-1">
              {cart?.items?.map((product, index) => {
                const productName = product?.productId?.productName || product?.productName || "Unknown Product";
                const productPrice = product?.productId?.productPrice || product?.productPrice || 0;
                const productImage = product?.productId?.productImg?.[0]?.url || product?.productImg?.[0]?.url || manocin;
                const productIdValue = product?.productId?._id || product?._id;

                return (
                <Card key={index}>
                  <div className="flex justify-between items-center pr-7">
                    <div className="flex items-center w-[350px]">
                      <img
                        className="w-24 h-24 rounded object-cover"
                        src={productImage}
                        alt={productName}
                      />
                      <div className="w-[280px] pl-4">
                        <h1 className="font-semibold truncate text-sm">
                          {productName}
                        </h1>
                        <p className="text-pink-600 font-semibold">₹{productPrice}</p>
                      </div>
                    </div>
                    <div className="flex gap-5 items-center">
                      <Button
                        onClick={() => handleUpdateQuantity(productIdValue, "decrease")}
                        variant="outline"
                        size="sm"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{product.quantity}</span>
                      <Button
                        onClick={() => handleUpdateQuantity(productIdValue, "increase")}
                        variant="outline"
                        size="sm"
                      >
                        +
                      </Button>
                    </div>
                    <p className="font-semibold min-w-20 text-right">₹{(productPrice * product.quantity).toLocaleString("en-IN")}</p>
                    <button
                      onClick={() => handleRemove(productIdValue)}
                      className="flex text-red-500 items-center gap-1 cursor-pointer hover:text-red-700"
                    >
                      <Trash2 size={18} />
                      <span className="text-sm">Remove</span>
                    </button>
                  </div>
                </Card>
              );
              })}
            </div>
            <div>
              <Card className="w-[400px]">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex  justify-between">
                    <span>Subtotal ({cart?.items?.length} items)</span>
                    <span>{cart?.totalPrice?.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex  justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>
                  <div className="flex  justify-between">
                    <span>Tax(5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="space-y-3 pt-4">
                    <div className="flex space-x-2">
                      <Input placeholder="Promo Code" />
                      <Button variant="outline">Apply</Button>
                    </div>
                    <Button onClick={() => navigate("/address")} className="w-full bg-pink-600">
                      Place Order
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Link to="/products">Contine Shopping</Link>
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4">
                    <p>* Free Shipping on order over 300</p>
                    <p>* 30-days return policy</p>
                    <p>* Secure checkout with SSL encription</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
          {/* Icon */}
          <div className="bg-pink-100 rounded-full p-6">
            <ShoppingCart className="text-pink-600 w-16 h-16" />
          </div>
          <h2 className="font-bold text-2xl mt-6 text-gray-800 ">Your Cart is Empty</h2>
          <p className="mt-2 text-gray-600">Looks like you haven't added anything to your cart</p>
          <Button
            onClick={() => navigate("/products")}
            className="bg-pink-600 mt-6 cursor-pointer text-white py-3 px-6 hover:bg-pink-700"
          >
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
