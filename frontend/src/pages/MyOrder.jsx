import OrderCard from "@/components/OrderCard";

import axios from "axios";

import { useEffect, useState } from "react";

const MyOrder = () => {
  const [userOrder, setUserOrder] = useState(null);

  const getUserOrder = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/order/myorder`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.status) {
        setUserOrder(res.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserOrder();
  }, []);

  console.log("userOrder=>", userOrder);

  return <OrderCard userOrder={userOrder} />;
};

export default MyOrder;
