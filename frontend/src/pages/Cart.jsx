import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useSelector } from "react-redux";
import manocin from "../assets/manicon.png";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cart } = useSelector((store) => store.product);
  console.log("cart=>", cart);

  const subTotal = cart?.totalPrice;
  const shipping = subTotal > 300 ? 0 : 10;
  const tax = subTotal * 0.05; //5%
  const total = subTotal + shipping + tax;
  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {cart?.items?.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-7">Shooping Cart</h1>
          <div className="max-w-7xl mx-auto flex gap-7">
            <div className=" flex flex-col gap-5 flex-1">
              {cart?.items?.map((product, index) => (
                <Card key={index}>
                  <div className="flex justify-between items-center pr-7">
                    <div className="flex items-center w-[350px]">
                      <img
                        className="w-25 h-25"
                        src={product?.productId?.productImg?.[0].url || manocin}
                        alt=""
                      />
                      <div className="w-[280px]">
                        <h1 className="font-semibold truncate">
                          {product?.productId?.productName}
                        </h1>
                        <p>₹{product?.productId?.productPrice}</p>
                      </div>
                    </div>
                    <div className=" flex gap-5 items-center">
                      <Button variant="outline">-</Button>
                      <span>1</span>
                      <Button variant="outline">+</Button>
                    </div>
                    <p>{product?.productId?.productPrice * product.quantity}</p>
                    <p className="flex text-red-400 items-center gap-1 cursor-pointer">
                      <Trash2 />
                      Remove
                    </p>
                  </div>
                </Card>
              ))}
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
                    <Button className="w-full bg-pink-600">Place Order</Button>
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
        <div></div>
      )}
    </div>
  );
};

export default Cart;
