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
          <div className="space-y-6 w-full">
            {userOrder?.map((order) => {
              return (
                <div className="shadow-2xl rounded-2xl p-5 border border-gray-200">
                  {/* order header */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                      Order Id: <span className="text-gray-600">{order._id}</span>
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Amount{" "}
                      <span className="font-bold">
                        {order.currency} {order.amount.toFixed(2)}
                      </span>{" "}
                    </p>
                  </div>

                  {/*user Info */}
                  <div className="flex justify-between items-center">
                    <div className="mb-4">
                      <p className="text-sm text-gray-700"><span className="font-medium">User:{" "} {order.user?.firstName || "Unknown"} {order.user?.lastName}</span></p>
                      <p className="text-sm text-gray-500">
                        Email:{order.user?.email || "N/A"}
                      </p>
                    </div>
                    <span className={`${order.status === "Paid" ? "bg-green-500" : order.status === "Failed" ? "bg-red-500" : "bg-orange-300"} text-white px-2 py-1 rounded-lg`}>{order.status}</span>
                  </div>

                  {/* Products */}
                  <div>
                    <h3 className="font-medium mb-2">Products:</h3>
                    <ul className="space-y-2">
                      {order.products.map((product, index) => (
                        <li onClick={() => navigate(`products/${product?.productId?._id}`)} key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                          <img src={product.productId.productImg?.[0].url} alt="" className="w-16 h-16 object-cover rounded-md cursor-pointer" />
                          <span className="w-[300px] line-clamp-2">{product?.producId?.productName}</span>
                          <span>{product?.productId?._id}</span>
                          <span className='font-medium'>{product.productId?.productPrice} x {product.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
