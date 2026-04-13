import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowUserOrders = () => {
  const params = useParams();
  const [userOrder, setUserOrder] = useState(null);

  const getUserOrders = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${import.meta.env.VITE_URL}/api/v1/order/user-order/${params.userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.status) {
      console.log("res.data", res.data);
      setUserOrder(res.data.orders);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);
  return (
    <div className="w-full h-screen px-4 md:px-8 py-6 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <OrderCard userOrder={userOrder} />
      </div>
    </div>
  );
};

export default ShowUserOrders;
