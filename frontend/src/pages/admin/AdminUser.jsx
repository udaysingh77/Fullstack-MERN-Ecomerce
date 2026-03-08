import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const AdminUser = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/all-user", {
        headers: {
          Autherization: `Bearer ${token}`,
        },
      });
      if (res.data.status) {
        setUsers(res.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="pl-[350px] py-20 pr-20 mx-auto px-4">
      <h1 className=" font-bold text-2xl">User Managment</h1>
      <p>View and Manage Registered User</p>
      <div className="flex relative w-[300px] mt-6">
        <Input placeholder="Search Users..." className="pl-10"></Input>
        <Search className="absolute left-2 top-1 text-gray-600"></Search>
      </div>
    </div>
  );
};

export default AdminUser;
