import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AdminSales = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    salesByDate: [],
  });

  const fetchSates = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("=>", `${import.meta.env.VITE_URL}/api/v1/order/sales`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/order/sales`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("res=", res.data);

      if (res.data.status) setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSates();
  }, []);

  return (
    <div className="w-full h-screen bg-white mt-10 px-4 md:px-8 py-6 flex flex-col overflow-hidden">
      <div className="p-6 grid gap-6 lg:grid-cols-4 shrink-0">
        {/* stats card */}
        <Card className="bg-pink-500 text-white shadow">
          <CardHeader>
            <CardTitle>Total User</CardTitle>
          </CardHeader>
          <CardContent>{stats.totalUsers}</CardContent>
        </Card>
        <Card className="bg-pink-500 text-white shadow">
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>{stats.totalProducts}</CardContent>
        </Card>
        <Card className="bg-pink-500 text-white shadow">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>{stats.totalOrders}</CardContent>
        </Card>
        <Card className="bg-pink-500 text-white shadow">
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>{stats.totalSales}</CardContent>
        </Card>

        {/* //sales chart */}
        <Card className="lg:col-span-4 flex flex-col h-80">
          <CardHeader className="shrink-0">
            <CardTitle>Sales (Last 30 days)</CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex items-center justify-center" style={{ height: 'auto' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.salesByDate}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#F47286" fill="#F47286" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSales;
