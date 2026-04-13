import { Input } from "@/components/ui/input";
import { Search, Edit, Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserLogo from "./../../assets/user-icon.jpg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/all-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res=>", res.data);
      if (res.data.status) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUser = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getAllUsers();
  }, []);

  console.log("user=>", users);
  return (
    <div className="w-full h-screen px-4 md:px-8 mx-auto flex flex-col bg-white overflow-hidden">
      <h1 className=" font-bold text-2xl py-6 shrink-0">User Managment</h1>
      <p className="shrink-0">View and Manage Registered User</p>
      <div className="flex relative w-[300px] mt-3 mb-3 shrink-0">
        <Input
          placeholder="Search Users..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        ></Input>
        <Search className="absolute left-2 top-1 text-gray-600"></Search>
      </div>
      <div className="grid grid-cols-3 gap-5 flex-1 overflow-y-auto">
        {filteredUser.map((user, index) => {
          return (
            <div key={index} className="bg-pink-100 p-3 rounded-lg h-32">
              <div className="flex items-center gap-2">
                <img
                  className="rounded-full w-14 aspect-square object-cover border border-pink-600 shrink-0"
                  src={user?.profilePic || UserLogo}
                  alt=""
                />
                <div className="min-w-0">
                  <h1 className="font-semibold text-sm">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <h3 className="text-xs text-gray-600 truncate">{user?.email}</h3>
                </div>
              </div>
              <div className="flex gap-1 mt-2 text-xs">
                <Button size="sm" variant="outline" onClick={() => navigate(`/dashboard/users/${user?._id}`)} className="flex-1">
                  <Edit size={14} />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/dashboard/users/orders/${user?._id}`)}
                  className="flex-1"
                >
                  <Eye size={14} />
                  View
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminUser;
