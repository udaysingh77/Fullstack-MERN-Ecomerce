import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  console.log("orders", orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/v1/order/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("data", data);

        if (data.status) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.log("Error in AdminOrder", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading all Orders...</div>;
  }

  return (
    <div className="w-full h-screen px-4 md:px-8 mx-auto flex flex-col bg-white overflow-hidden">
      <h1 className="text-3xl font-bold py-6 shrink-0">Admin - All Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="overflow-x-auto flex-1 overflow-y-auto">
          <table className="w-full border border-gray-200 text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">OrderId</th>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Products</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{order._id}</td>
                  <td className="px-4 py-2 border">
                    {order.user?.name} <br />
                    <span className="text-xs text-gray-500">{order.user?.email}</span>
                  </td>
                  <td className="px-4 py-2 border">
                    {order?.products?.map((p, idx) => (
                      <div key={idx} className="text-sm">
                        {p.productName} x {p.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-2 border font-semibold">
                    {order.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${order.status === "paid" ? "bg-green-100 text-green-700" : order.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
