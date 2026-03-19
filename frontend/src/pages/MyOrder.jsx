import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MyOrder = () => {
  const [userOrder, setUserOrder] = useState(null);
  const navigate = useNavigate();
  const getUserOrder = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/order/myorder`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.status) {
        setUserOrder(res.data.order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserOrder();
  }, []);

  console.log("userOrder=>", userOrder);

  return (
    <div className="flex flex-col pr-20 gap-3">
      <div className="w-full p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold">Orders</h1>
        </div>
        {userOrder?.length === 0 ? (
          <div className="text-gray-800 space-y-6 text-2xl">
            <p>No Order found for this user</p>
          </div>
        ) : (
          <div>
            {userOrder?.map((order) => {
              <div>
                <div>
                  <h2>
                    Order Id: <span className="text-gray-600">{order._id}</span>
                  </h2>
                </div>
              </div>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
