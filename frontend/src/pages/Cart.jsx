import { Card } from "@/components/ui/card";
import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const { cart } = useSelector((store) => store.product);
  console.log("cart=>", cart);
  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {cart.items.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-7">Shooping Cart</h1>
          <div className="max-w-7xl mx-auto flex gap-7">
            <div className=" flex flex-col gap-5 flex-1">
              {cart?.items?.map((item, index) => (
                <Card key={index}>
                  <div className=""></div>
                </Card>
              ))}
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
